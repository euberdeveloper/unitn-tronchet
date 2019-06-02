import { Exam } from '../types/exam.interface';

const EXAM: Exam = {
    name: 'Esame - 02/2019',
    id: 'esame_2019-02',
    exercises: [
        {
            code: `#include <cstdlib>
#include <iostream>
using namespace std;
int x = 15;
void f(int m){ x += m; m++; }
int g() { return x; }
int main() {
    int x = 5;
    f(x);
    cout<<g();
    cout<<x;
    return O;
}`,
            solution: ['205']
        },
        {
code: `public class Test2 {
    static final int MAX = 1O;
    public static void main(String[] args) {
        A a = new A();
        a.m1 (l) ;
        C c = new C();
        c.m2(2);
    }
}
interface Il {
    public int m1(int x);
}
interface I2 {
    public int m2(int x) {
        return x + MAX;
    }
}
class A implements I1 {
    int a = 20;
    public int m1(int x) {
        return a + x;
    }
}
class B extends A {}
class C extends B implements I2 {}`,
            solution: {
                type: 'COMPILETIME',
                row: 14,
                cause: 'Implementazione di un metodo in un\'interfaccia senza la parola chiave default'
            }
        },
        {
            code: `public class Test3 {
    public static void main(String[] args) {
        B b1=newB(newA());b1.m(3);
        B b2 = new B(); b2.m(5);
        System.out.println(b2);
    }
}
class A {
static int x = 3;
    A () { x++; }
    void m(int x) { this.x += x; }
    public String toString() { return "x="+x; }
}
class B {
    A a;
    B(A a) { this.a = a; }
    B() { super(); }
    void m(int x) { a.m(x); }
    public String toString() { return a.toString(); }
}`,
            solution: {
                type: 'COMPILETIME',
                row: 18,
                cause: 'NullPointerException'
            }
        },
        {
            code: `public class Test4 {
    public static void main(String[] args) {
        Z a = new Z();
        a.m1(5);
        System.out.print("y="+a.y);
    }
}
class Z {
    static int y = 2;
    void m1(int y) { m2(y++); }
    void m2 (int y) { --y; }
}`,
            solution: ['y=2']
        },
        {
            code: `public class Test5 {
    public static void main(String[] args) {
        A a new A( ); a .m();
        B b = new C(); b.m1(1); b.m2(2);
    }
}
interface I {
    public int ml(int a);
}
interface J {
    public int m2(int b);
}
interface K extends I,J {}
class A {
    public String m() { return "this is A"; }
}
class B implements K {
    int x = 500;
    public int m1(int a) { return a * x; }
    public int m2(int b) { return b + x; }
}
class C extends A,B {}`,
            solution: {
                type: 'COMPILETIME',
                row: 22,
                cause: 'Non si può estendere da due classi'
            }
        },
        {
            code: `public class Test6 {
    public static void main(String[] args) {
        A[] a = new A[4];
        for (int i = O; i < a.length; i++) {
        if (i%2 != O) a[i]= new A(i);
        else a[i]= new B(i);
        }
        List<A> l = new ArrayList<>(Arrays.asList(a));
        for(A e: l) System.out.print(e.m(5) + " ");
    }
}
class A {
    int x;
    A(int x) { this.x = x + l; }
    public int m(int z) { return x + z; }
}
class B extends A {
    B(int x) { super(x); this.x x + 2; }
}`,
            solution: ['7799']
        },
        {
            code: `public class Test7 {
    public static void main(String[] args) {
        A a = new A();
        int r1 = a.m(1);
        A a2 = new B(new Z());
        int r2 = a2.m(2);
        B b = new B(new Z());
        int r3=b.m(3);
        System.out.print("" + r1 + " " + r2 + " " + r3);
    }
}
class Z {}
class A {
    static int val = 7;
    int m(int x) { val--; return x * val; }
}
class B extends A {
    Z z;
    B(Z z) {this.z = z; val++; }
    int m(int x) { return x * val + 1; }
}`,
            solution: ['6 13 25']
        },
        {
            code: `public class Test8 {
    public static void main(String[] args) {
        A a1 = new A(5);
        A a2 = new A(3);
        A a3 = new A(5);
        System.out.print(a1.equals(a2));
        System.out.print(a1.equals(a3));
    }
}
class A {
    int x = 0;
    A(int x) {this.x = x;}
}`,
            solution: ['falsefalse']
        },
        [
            {
                question: 'In Java esiste ereditarietà singola: quindi, un tipo interfaccia può ereditare da un solo tipo interfaccia.',
                solution: true
            },
            {
                question: 'Le variabili dichiarate static sono modificabili anche da metodi private.',
                solution: false
            },
            {
                question: 'Un metodo generico è un qualsiasi metodo che contiene parametri di tipo Object nella propria definizione.',
                solution: false
            },
            {
                question: 'Sia data una classe Java che contiene un metodo m(). Una sottoclasse B di A può ridefinire m() una sola volta mediante override e un numero arbitrario di volte mediante overload.',
                solution: false
            },
            {
                question: 'Una classe Java definita come abstract può essere usata all\'interno di gerarchie di classi con ereditarietà multipla.',
                solution: true
            },
            {
                question: 'In Java, se B è una sottoclasse di A, l\'istruzione B a = new A(); genera errore a runtime.',
                solution: true
            },
            {
                question: 'Si consideri un attributo x dichiarato come protected nella classe C del package Pl; x non è visibile da una classe D appartenente a un package P2, a meno che D non erediti da c.',
                solution: false
            },
            {
                question: 'In Java la parola chiave this serve a identificare un particolare elemento all\'interno di un array.',
                solution: false
            }
        ]
    ]
};

export default EXAM;
