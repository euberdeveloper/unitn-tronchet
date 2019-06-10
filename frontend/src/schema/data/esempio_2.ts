import { Exam } from '../types/exam.interface';

const EXAM: Exam = {
    name: 'Esempio 2',
    id: 'esempio_2',
    exercises: [
        {
            code: `class B{
    B(){ System.out.print("C");}
    void f() { System.out.print("D");}
}
public class A extends B {
    A(){ System.out.print("A");}
    void f() { System.out.print("B");}
    public static void main(String[] args) {
        A b=new A();
        B a=(B)b;
        a.f();
}}`,
            solution: ['CAB']
        },
        {
code: `class B{
    B(){ System.out.print("C");}
    void f() { System.out.print("D");}
}
public class A extends B {
    A(){ System.out.print("A");}
    void f() { System.out.print("B");}
    public static void main(String k[]) {
        B b=new B();
        A a=(A)b;
        a.f();
}}`,
            solution: {
                type: 'RUNTIME',
                row: 10,
                cause: 'Non si può fare il casting da superclasse a classe figlia'
            }
        },
        {
            code: `package esame; // NOTA :QUESTA CLASSE E’ NEL FILE A.java
public class A {
    int x=3;
    public static void main(String string[]) {
        (new abcd.B()).f();
} }
package abcd; // NOTA :QUESTA CLASSE E’ NEL FILE B.java
public class B extends esame.A{
    public void f(){
        System.out.println(++x);
} }`,
            solution: {
                type: 'COMPILETIME',
                row: 10,
                cause: 'x ha visibilità package e B non può accederci essendo in un package diverso'
            }
        },
        {
            code: `#include <cstdlib>
#include <iostream>
using namespace std;
void cambia( int m, int n[7]) {
    (*(n+m))--; m++; n--;
}
int main(){
    int vet[] = {1,2,3,4,5};
    cambia(vet[4],vet-1);
    cambia(0,&vet[4]);
    int i=0;
    for (i=0;i<5;i++) cout << vet[i];
    return 0;
}`,
            solution: ['12343']
        },
        {
            code: `public class A{
    public static int x;
    A(int s) {x=s;}
    void f() {System.out.print(x);}
    public static void main(String a[]){
        A b=new A(3);
        A c=new A(4);
        b.f();
        c.f();
    }
}`,
            solution: ['44']
        },
        {
            code: `public class B {
    static int s=0;
    B(int i){s=i;}
    public static void main(String[] args) {
        B b1=new B(3);
        B b2=new B(3);
        B b3=new B(1);
        if (b1.equals(b2)) System.out.print("A");
            else System.out.print("B");
        if (b1.s==b3.s) System.out.print("D");
            else System.out.print("C");
} }`,
            solution: ['BD']
        },
        {
            code: `class A {
    A(int x) {System.out.print("X");}
    A() {System.out.print("Z");}
    public void finalize() {System.out.print("Y");}
}
class B extends A {
    B(int x) {System.out.print("A");}
    B() {System.out.print("C");}
    public void finalize() {System.out.print("B");}
}
public class Prova {
    public static void main(String args[]) {
        A a=new B(3);
        a = null;
        System.gc();
        System.runFinalization();
    }
}`,
            solution: ['ZAB']
        },
        {
            code: `package uno;
public class A {
    void f(int k) {
        System.out.print(k*3);
    }
    public static void main (String args[]){
        Object z = new B();
        if (z instanceof uno.A) ((A) z).f(3);
        if (z instanceof uno.B) ((B) z).f(3);
    }
}
class B extends A{
    void f(int k) {
        System.out.print(k*2);
    }
}`,
            solution: ['66']
        },
        [
            {
                question: 'Non è possibile istanziare una Collection.',
                solution: true
            },
            {
                question: 'In una classe ci può essere un solo metodo main.',
                solution: false
            },
            {
                question: 'In un programma ci può essere un solo metodo public static void main(String[] args).',
                solution: false
            },
            {
                question: 'In Java esiste ereditarietà multipla.',
                solution: false
            },
            {
                question: 'Java usa solo la heap perché tutta la memoria è allocata dinamicamente con le new().',
                solution: false
            },
            {
                question: 'Una Interface non può ereditare da una classe.',
                solution: true
            },
            {
                question: 'Se di un metodo f faccio overriding non è detto che ci siano più “signatures” (firme) di metodi legate al nome f.',
                solution: true
            },
            {
                question: 'Se di un metodo f faccio overloading non è detto che ci siano più “signatures” (firme) di metodi legate al nome f.',
                solution: false
            }
        ]
    ]
};

export default EXAM;
