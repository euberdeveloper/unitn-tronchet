import { Exam } from '../types/exam.interface';

const EXAM: Exam = {
    name: 'Esame - 07/2011',
    id: 'esame_2011-07',
    exercises: [
        {
            code: `import java.util.*;
public class A {
    A(int m){
        Collection<String> b = new TreeSet<String>();
        for (int k=0;k<10;k++) {
            String s="W"+(k%m);
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
            solution: ['W0W1W2']
        },
        {
            code: `import java.util.*;
public class B {
    B(){
        Collection b = new Collection();
        for (int k=0; k<10; k++) {
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
        new B();
        new B(); }
    public static void main(String a) {
        new B();
    }
}`,
            solution: {
                type: 'COMPILETIME',
                row: 4,
                cause: 'Collection è abstract e non si può istanziare'
            }
        },
        {
            code: `public class C {
    public static int x;
    C(int s) {x=s;}
    void f() {System.out.print(x);}
    public static void main(String a[]){
        C b=new C(4);
        C c=new C(1);
        b.f();
        c.f();
}   }`,
            solution: ['11']
        },
        {
            code: `public class E {
    static int s=0;
    E(int i){s=i;}
    public static void main(String[] args) {
        E b1=new E(3);
        E b2=new E(3);
        E b3=new E(1);
        if (b1.equals(b2)) System.out.print("K");
            else System.out.print("I");
        if (b1.s==b3.s) System.out.print("D");
            else System.out.print("A");
}   }`,
            solution: ['ID']
        },
        {
            code: `#include <iostream>
using namespace std;
void g(char x[], int y) {
    y--;
    x[y]--; }
void f(char *x, int * y) {
    (*y)++;
    x[*y]++; }
int main() {
    char x[2];
    int y;
    x[0]='G'; x[1]='G'; y=0;
    f(x, &y);
    g(x, y);
    cout<<x[0]<<" "<<x[1]<<" "<<y;
    return 0;   }`,
            solution: ['F H 1']
        },
        {
            code: `public class G implements Cloneable {
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
        G b = new G();
        G c = b.clone();
        G d = new G();
        if (b.equals(c)) System.out.print("A");
        if (c.equals(d)) System.out.print("J");
        if (d.equals(b)) System.out.print("K");
}}`,
            solution: ['K']
        },
        {
            code: `public class F{
    int x=2;
    F(int x) {
        f(x);
        f();
        System.out.print(x);
    }
    void f() { x++; System.out.print(x);}
    void f(int x) { this.x++; x--;System.out.print(x);}
    public static void main(String arg[]) {
        F x=new F(3);
}}`,
            solution: ['243']
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
    public void finalize() { System.out.print("S"); }
    public static void main(String[] args) {
        D a5=new D();   a5.f();
        a5=new D();     a5.f();
        System.gc();    System.runFinalization();
}}`,
            solution: [
                'S235',
                'S253',
                'S325',
                'S352',
                'S523',
                'S532',
                '2S35',
                '2S53',
                '23S5',
                '235S',
                '25S3',
                '253S',
                '3S25',
                '3S52',
                '32S5',
                '325S',
                '35S2',
                '352S',
                '5S23',
                '5S32',
                '52S3',
                '523S',
                '53S2',
                '532S'
            ]
        },
        [
            {
                question: 'Se A è padre di B la scrittura B a=(B)(new A()); genera errore a compiletime.',
                solution: false
            },
            {
                question: 'Se B estende A la scrittura B a=new A(); genera errore a compiletime.',
                solution: true
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
                question: 'Il main può accedere a qualunque variabile di istanza della classe in cui è contenuto.',
                solution: false
            },
            {
                question: 'Di default l\'operatore == e il metodo equals fanno la stessa cosa.',
                solution: true
            },
            {
                question: 'Il costruttore di una classe può non essere visibile all\'esterno della classe stessa.',
                solution: true
            }
        ]
    ]
};

export default EXAM;
