import { Exam } from '../types/exam.interface';

const EXAM: Exam = {
    name: 'Esame - 07/2018',
    id: 'esame_2018-07',
    exercises: [
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
        System.out.print(k);
    }}`,
            solution: ['36']
        },
        {
            code: `public class Test3 {
    public static void main(String[] args) {
        A a = new A();
        a.m1(5);
        System.out.println("y="+a.y);
}   }
class A {
    int y = 4;
    void m1(int y) { m2(y++); }
    void m2(int y) { --y; }
}`,
            solution: ['y=4\\n']
        },
        {
            code: `#include <cstdlib>
#include <iostream>
using namespace std;
void f(int k){ k++; }
void g(int *k){ (*k)++; }
void h(int *k){ --k; }
int main() {
    int k[]={3,5,8,13};
    f(k[2]);
    g(&k[3]);
    h(k);
    for (int i=0; i < 4; i++) { cout << k[i]; }
    return 0;
}`,
            solution: ['35814']
        },
        {
            code: `public class Sette {
    Sette(){
        List<String> a = new Arraylist<String>();
        List<String> b = new HashSet<String>();
        for (int k=0; k<10;k++) {
            String s="A"+(k%3);
            a.add(s);
            b.add(s);
        }
        System.out.println(a.size()+" "+b.size());
    }
    public static void main(String[] a) { new Sette(); }
    public static void main(String a) {new Sette(); new Sette();}
}`,
            solution: {
                type: 'COMPILETIME',
                row: 4,
                cause: 'List non è superclasse di HashSet'
            }
        },
        {
            code: `public class Sette {
    Sette(){
        Collection<String> a = new Arraylist<String>();
        Collection<String> b = new HashSet<String>();
        for (int k=0; k<10;k++) {
            String s="A"+(k%5);
            a.add(s);
            b.add(s);
        }
        System.out.println(a.size()+" "+b.size());
    }
    public static void main(String[] a) { new Sette(); }
}`,
            solution: ['10 5']
        },
        {
            code: `public class A {//this class is in the A.java file
    public int x=0;
    A(int x) {x=6;}
}
public class B1 {//this class is in the B1.java file
    public static void main(String a[]){
        A a1=new A();
        A a2=new A(9);
        System.out.println(a1.x+" "+a2.x);
    }
}`,
            solution: {
                type: 'COMPILETIME',
                row: 7,
                cause: 'Non esiste un costruttore di A con firma A()'
            }
        },
        {
            code: `public class D {
static int x=1;
public static void main(String[] args) {
    D a5=new D();   a5.f();
    a5=new D();     a5.f();
    System.gc();    System.runFinalization();
}
void f() {Pippo a=new Pippo2();
}
public void finalize() { System.out.print("Z"); }
class Pippo {
    int k;
    Pippo() {k=++x;}
    public void finalize() { System.out.print(k); }
}
class Pippo2 extends Pippo {
    Pippo2() {k=x++;}
}}`,
            solution: [
                'Z24',
                'Z42',
                '2Z4',
                '24Z',
                '42Z',
                '4Z2'
            ]
        },
        [
            {
                question: 'Nei metodi statici non è possibile leggere e scrivere le variabili di istanza.',
                solution: true
            },
            {
                question: 'Si consideri un attributo x dichiarato come protected nella classe C del package P1; x non è visibile da una classe D appartenente a un package P2, a meno che D non erediti da C.',
                solution: true
            },
            {
                question: 'Si consideri un attributo x dichiarato come protected nella classe C del package P1; x è visibile da un\'altra classe D appartenente allo stesso package P1 solo se D eredita da C.',
                solution: false
            },
            {
                question: 'In Java esiste ereditarietà singola: quindi, un tipo interfaccia può ereditare da un solo tipo interfaccia.',
                solution: false
            },
            {
                question: 'Sia I un\'interfaccia, e C una classe che la implementa. L\'assegnamento C c = new I(); non causa errori in compilazione, ma può generare errori a runtime.',
                solution: false
            },
            {
                question: 'Un metodo generico è un qualsiasi metodo che contiene parametri di tipo Object nella propria definizione.',
                solution: false
            },
            {
                question: 'Il costruttore di una classe chiama automaticamente il costruttore della superclasse con gli stessi parametri; se inquesta non è disponibile un costruttore con la stessa firma, ciene chiamato il costruttore senza parametri.',
                solution: false
            },
            {
                question: 'Le variabili dichiarate static non sono modificabili dai metodi privati.',
                solution: false
            }
        ]
    ]
};

export default EXAM;
