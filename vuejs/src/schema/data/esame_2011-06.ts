import { Exam } from '../types/exam.interface';

const EXAM: Exam = {
    name: 'Esame - 06/2011',
    id: 'esame_2011-06',
    exercises: [
        {
            code: `public class E {
static int s=0;
E(int i) {s=i;}
public static void main(String[] args) {
    E b1=new E(3);
    E b2=new E(3);
    E b3=new E(1);
    if (b1.equals(b2)) System.out.print("K");
        else System.out.print("I");
    if (b1.s==b3.s) System.out.print("A");
        else System.out.print("D");
}   }`,
            solution: ['IA']
        },
        {
            code: `#include <iostream>
using namespace std;
void g(char x[], int y) {
    y--;
    x[y]--; }
void f(char *x, int * y) {
    (*y) ++;
    x[*y]++;    }
int main(){
    char x[2];
    int y;
    x[0]='R'; x[1]='R'; y=0;
    f(x, &y);
    g(x, y);
    cout<<x[0]<<" "<<x[1]<<" "<<y;
    return 0;   }`,
            solution: ['Q S 1']
        },
        {
            code: `public class G implements Cloneable{
    int k=0;
    public G clone() {
        G copia=null;
        try {
            copia=(G)super.clone();
        } catch (CloneNotSupportedException ex) {
            System.exit(0);
        }
        copia.k++;
        return copia;
    }
    public boolean equals(Object x) {
        if (! (x instanceof G)) return false;
        return k==((G)x).k;
    }
    public static void main(String[] args) {
        G b= new G();
        G c=b.clone();
        G d=new G();
        if (b.equals(c)) System.out.print("A");
        if (c.equals(d)) System.out.print("B");
        if (d.equals(b)) System.out.print("C");
}}`,
            solution: ['C']
        },
        {
            code: `import java.util.*;
public class A {
    A(int m) {
        Collection<String> b = new TreeSet<String>();
        for (int k=0;k<10;k++) {
            String s="A"+(k%m);
            b.add(s);
        }
        int count=0;
        Iterator<String> i=b.iterator();
        while (i.hasNext()) {
            String s=i.next();
            System.out.print(s);
        }
    }
    public static void main(String[] a) { new A(3); }
}`,
            solution: ['A0A1A2']
        },
        {
            code: `import java.util.*;
public class B {
    B() {
        Collection b = new Collection();
        for (int k=0;k<10;k++) {
            String s="A"+(k%4);
            b.add(s);
        }
        int count=0;
        Iterator i=b.iterator();
        while (i.hasNext()) {
            Object s=i.next();
            count++;
        }
        System.out.println(count);
    }
    public static void main(String[] a) {
        new B(); new B();
    }
    public static void main(String a) {
        new B();
    }
}`,
            solution: {
                type: 'COMPILETIME',
                row: 4,
                cause: 'Collection è abstract e non si può istanziarla'
            }
        },
        {
            code: `public class C{
public static int x;
C(int s) {x=s;}
void f() {System.out.print(x);}
public static void main(String a[]){
    C b=new C(3);
    C c=new C(5);
    b.f();
    c.f();
}   }`,
            solution: ['55']
        },
        {
            code: `public class F{
int x=2;
F(int x) {
    f(x);
    f();
    System.out.println(x);
}
void f() { x++; System.out.print(x);}
void f(int x) { this.x++; x--;System.out.print(x);}
public static void main(String arg[]) {
    F x=new F(9);
}}`,
            solution: ['849\\n']
        },
        {
            code: `public class D {
    static int x=1;
    class String5 {
        String s;
        String5() {this.s=""+(++x);}
        public void finalize() { System.out.print(s); }
    }
    String5 a=new String5();
    void f() {String5 a=new String5();
    }
    public void finalize() { System.out.print("A"); }
    public static void main(String[] args) {
        D a5=new D();   a5.f();
        a5=new D();     a5.f();
        System.gc();    System.runFinalization();
}}`,
            solution: [
                'A235',
                'A253',
                'A325',
                'A352',
                'A523',
                'A532',
                '2A35',
                '2A53',
                '23A5',
                '235A',
                '25A3',
                '253A',
                '3A25',
                '3A52',
                '32A5',
                '325A',
                '35A2',
                '352A',
                '5A32',
                '5A23',
                '53A2',
                '532A',
                '52A3',
                '523A',
            ]
        },
        [
            {
                question: 'Se B estende A la scrittura B a=new A(); genera errore a compiletime.',
                solution: true
            },
            {
                question: 'Se A è padre di B la scrittura B a=(B)(new A()); genera errore a compiletime.',
                solution: false
            },
            {
                question: 'Un oggetto ed un suo clone sono identici.',
                solution: false
            },
            {
                question: 'Poichè Java usa sempre dynamic binding, esso usa sempre la heap e mai lo stack.',
                solution: false
            },
            {
                question: 'Ereditarietà multipla è permessa con le interfacce e le classi astratte.',
                solution: false
            },
            {
                question: 'Di default l\'operatore == e il metodo equals fano la stessa cosa.',
                solution: true
            },
            {
                question: 'Il main può accedere a qualunque variabile di istanza della classe in cui è contenuto.',
                solution: false
            },
            {
                question: 'Il costruttore di una classe può essere visibile all\'esterno della classe stessa.',
                solution: true
            }
        ],
    ]
};

export default EXAM;
