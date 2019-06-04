import { Exam } from '../types/exam.interface';

const EXAM: Exam = {
    name: 'Esame - 06/2018',
    id: 'esame_2018-06',
    exercises: [
        {
            code: `public class D {
    static int x=3;
    public static void main(String[] args) {
        D a5=new D();   a5.f();
        a5=new D();     a5.f();
        System.gc();    System.runFinalization();
    }
    void f() {Pippo a = new Pippo2();
    }
    public void finalize() { System.out.print("X"); }
    class Pippo {
        int k;
        Pippo() {k=++x;}
        public void finalize() { System.out.print(k); }
    }
    class Pippo2 extends Pippo {
        Pippo2() {k=x++;}
}}`,
            solution: [
                'X64',
                'X46',
                '46X',
                '4X6',
                '64X',
                '6X4'
            ]
        },
        {
            code: `import java.util.*;
public class Sette {
    Sette(){
        Collection<String> a = new ArrayList<String>();
        Collection<String> b = new HashSet<String>();
        for (int k=0;k<10;k++) {
            String s="A"+(k%8);
            a.add(s);
            b.add(s);
        }
        System.out.println(a.size()+b.size());
    }
    public static void main(String[] a) {
        new Sette();
}}`,
            solution: ['18\\n']
        },
        {
            code: `import java.util.*;
public class Sette {
    Sette(){
        Set<String> a = new ArrayList<String>();
        Set<String> b = new HashSet<String>();
        for (int k00; k<10; k++) {
            String s="A"+(k%8);
            a.add(s);
            b.add(s);
        }
        System.out.println(a.size()+b.size());
    }
    public static void main(String[] a) {
        new Sette();
}}`,
            solution: {
                type: 'COMPILETIME',
                row: 4,
                cause: 'Set non è una superclasse di ArrayList'
            }
        },
        {
            code: `#include <cstdlib>
#include <iostream>
using namespace std;
void f(int k[0]){ --k[1]; }
void g(int * k){ (*(--k))++;}
void h(int k[1]){--k;}
int main() {
    int k[]={1,2,3,4};
    f(k+2);
    g(k+2);
    h(k+2);
    for (int i=1;i<4;i++) { cout<<k[i]; }
    return 0;
}`,
            solution: ['333']
        },
        {
            code: `public class B {
    static int x = 2;
    B() { x++; }
    B(int y) {x=x+y;}
    public void finalize(){x--;}
    public static void main(String[] args) {
        A a2 = new A();
        System.out.print(a2);
        A a1 = new A(2);
        System.out.print(a1);
    }
    public String toString(){return ""+x;}
}
class A extends B {
    int x=4;
    A() { x++; }
    A(int x) {super(x); x++;}
    public String toString(){return super.toString()+x;}
}`,
            solution: ['3554']
        },
        {
            code: `public class C {
    int s=8;
    void f() {System.out.print("A"+(++s));}
    public static void main(String[]a){
        C y=new C();
        C x=new C() {
            void f() {System.out.print("B"+(--s));}
        };
        x.f();
        y.f();
    }
}`,
            solution: ['B7A9']
        },
        {
            code: `package uno;
public class C {
    void f(int k) {
        System.out.print(k*3);
    }
    public static void main (String args[]){
        Object z = new B();
        if (z instanceof uno.C) ((C) z).f(3);
        if (z instanceof uno.B) ((B) z).f(6);
    }
    public static void main (String var){
        Object z = new B();
        if (z instanceof uno.C) ((C) z).f(3);
    }}
class B extends C{
    void f(int k) {
        System.out.print(k*2);
    }}`,
            solution: ['612']
        },
        {
            code: `public class A {//this class is in the A.java file
    public int x=0;
    private A() {x=3;}
    A(int x) {x=6;}
}
public class B1 {//this class is in the B1.java file
    public static void main(String a[]){
        A a1=new A();
        A a2=new A(9);
        System.out.print(a1.x+" "+a2.x);
    }
}`,
            solution: {
                type: 'COMPILETIME',
                row: 8,
                cause: 'Il costruttore con firma A(int) è privato'
            }
        },
        [
            {
                question: 'Nei metodi statici non è possibile leggere e scrivere le variabili di istanza.',
                solution: true
            },
            {
                question: 'Se una classe è astratta è permesso usarla per effettuare ereditarietà multipla.',
                solution: false
            },
            {
                question: 'In una classe ci può essere un solo metodo public static void main.',
                solution: false
            },
            {
                question: 'Se di un metodo f faccio overriding non è detto che ci siano più "signatures" (firme) di metodi legate al nome.',
                solution: true
            },
            {
                question: 'Se di un metodo f faccio overloading non è detto che ci siano più "signatures" (firme) di metodi legate al nome.',
                solution: false
            },
            {
                question: 'Il garbage collector di Java sospende l\'esecuzione del programma finchè non ha finito di liberare la memoria.',
                solution: false
            },
            {
                question: 'In Java non esistono le variabili globali.',
                solution: true
            },
            {
                question: 'Le variabili dichiarate static non sono modificabili dai metodi privati.',
                solution: false
            }
        ]
    ]
};

export default EXAM;
