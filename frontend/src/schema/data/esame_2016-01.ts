import { Exam } from '../types/exam.interface';

const EXAM: Exam = {
    name: 'Esame - 01/2016',
    id: 'esame_2016-01',
    exercises: [
        {
            code: `#include <iostream>
using namespace std;
void g(char x[], int y) {
    y--;
    x[y]--; }
void f(char *x, int * y) {
    (*y)++;
    x[*y]++;    }
int main() {
    char x[2];
    int y;
    x[0]='D';   x[1]='D';   y=0;
    f(x, &y);
    g(x, y);
    cout<<x[0]<<" "<<x[1]<<" "<<y;
    return 0;   }`,
            solution: ['C E 1']
        },
        {
            code: `public class F{
int x=3;
F(int x) {
    f(x);
    f();
    System.out.println(x);
}
void f() { x++; System.out.print(x);}
void f(int x) { this.x++; x--; System.out.print(x);}
public static void main(String arg[]) {
    F x = new F(9);
}}`,
            solution: ['859']
        },
        {
            code: `public class G implements Cloneable {
    int k=0;
    public G clone() {
        G copia=null;
        try {
            copia=(G)super.clone();
        }catch(CloneNotSupportedException e){System.exit(0);}
        copia.k++;
        return copia;
    }
    public int hashCode(){return 0;}
    public boolean equals(Object x) {
        if (! (x instanceof G)) return false;
        return k==((G)x).k;
    }
    public static void main(String[] args) {
        G b= new G();
        G c=(G)(b.clone());
        G d=new G();
        if (b.equals(c)) System.out.print("D");
        if (c.equals(d)) System.out.print("E");
        if (d.equals(b)) System.out.print("F");
    }
}`,
            solution: ['F']
        },
        {
            code: `public class C{
public static int x;
C(int s) {x=s;}
void f() { System.out.print(x);}
public static void main(String a[]) {
    C b=new C(7);
    C c=new C(10);
    b.f();
    c.f();
}   }`,
            solution: ['1010']
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
    public static void main(String[] a) { new B();new B(); }
}`,
            solution: {
                type: 'COMPILETIME',
                row: 4,
                cause: 'Collection è abstract e non si può istanziare'
            }
        },
        {
            code: `import java.util.*;
public class A {
    A(int m){
        List<String> b = new TreeSet<String>();
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
    public static void main(String[] a) { new A(3); }}`,
            solution: {
                type: 'COMPILETIME',
                row: 4,
                cause: 'TreeSet non è sottoclasse di List'
            }
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
            else System.out.print("X");
        if (b1.s==b3.s) System.out.print("IA");
            else System.out.print("D");
}   }`,
            solution: ['XIA']
        },
        {
            code: `public class D { static int x=1; S5 a=null;
    class S5 { int k;
        S5() {k=x;}
        public void finalize() {
            System.out.print(k); }
    }
    D() {x++; a=new S5();}
    void f() {S5 a=new S5();}
    public void finalize() { System.out.print("1");}
    public static void main(String[] args) {
        D a5=new D();   a5.f();
        a5=new D();     a5.f();
        System.gc();    System.runFinalization();
        System.out.print("-"); a5=null;
        System.gc(); System.runFinalization();
    }
    public static void main(String args)
        { D a5=new D();}
}`,
            solution: [
                '1223-13',
                '1232-13',
                '1322-13',
                '3221-13',
                '3212-13',
                '3122-13',
                '2321-13',
                '2312-13',
                '2123-13',
                '2132-13',
                '2231-13',
                '2213-13',
                '1223-31',
                '1232-31',
                '1322-31',
                '3221-31',
                '3212-31',
                '3122-31',
                '2321-31',
                '2312-31',
                '2123-31',
                '2132-31',
                '2231-31',
                '2213-31'
            ]
        },
        [
            {
                question: 'Un oggetto ed un suo clone non sono identici.',
                solution: true
            },
            {
                question: 'Poichè java usa sempre dynamic binding, esso usa sempre la heap e mai lo stack.',
                solution: false
            },
            {
                question: 'Ereditarietà multipla è permessa con le interfacce e le classi astratte.',
                solution: false
            },
            {
                question: 'Di default l\'operatore == e il metodo equals fanno la stessa cosa.',
                solution: true
            },
            {
                question: 'Il main può accedere a qualunque variabile di istanza della classe in cui è contenuto.',
                solution: false
            },
            {
                question: 'Il costruttore di una classe può non essere visibile all\'esterno della classe stessa.',
                solution: true
            },
            {
                question: 'Se B estende A la scrittura B a=new A(); genera errore a runtime.',
                solution: false
            },
            {
                question: 'Se A è padre di B la scrittura B a=(B)(new A()); genera errore a runtime.',
                solution: true
            }
        ]
    ]
};

export default EXAM;
