import { Exam } from '../types/exam.interface';

const EXAM: Exam = {
    name: 'Esame - 09/2018',
    id: 'esame_2018-09',
    exercises: [
        {
            code: `public class Test4 {
    public static void main(String[] args) {
        I i = new C(3);
        System.out.print(i.m(2));
    }
}
interface I {
    int m(int z);
}
class A implements I {
    int x;
    A(int x) { this.x = x + 1; }
    public int m(int z) { return x + z; }
}
class B extends A {
    B(int x) { super(++x); }
    public int m(int z) { return x * z; }
}
class C extends B {
    C(int x) { super(++x); }
}`,
            solution: ['12\\n']
        },
        {
            code: `public class Test5 {
    public static void main(String[] args) {
        B b = new B();
        A a = new A();
        J j= b;
        System.out.println(j.m(5) + b.m("hello"));
    }
}
interface I {
    int m(int z);
}
interface J extends I {
    int m(String s);
}
class A implements I {
    int x = 5;
    public int m(int z) { return x + z; }
}
class B implements J {
    public int m(String s) { return s.length(); }
}`,
            solution: {
                type: 'COMPILETIME',
                row: 19,
                cause: 'B non ha il metodo "int m(int)" implementato da J'
            }
        },
        {
            code: `#include <cstdlib>
#include <iostream>
using namespace std;
int x[] = {9, 2, 5, 1};
int f(int *x, int *y){
    y[3] = 5;
    return ++(*x);
}
int g(int a){
    x[0] = 0;
    return f(&x[a], x);
}
int main() {
    int a = 1;
    x[a] = a;
    cout << g(++a);
    for (int i = 0; i<4; i++) cout << x[i];
    return 0;
}`,
            solution: ['60165']
        },
        {
            code: `public class Test2 {
    public static void main(String[] args) {
        A[] a = new A[4];
        for (int i = 0; i < a.length; i++) {
            if (i%2 == 0) a[i]= new A(i);
            else a[i]= new B(i);
        }
        ArrayList<A> l = new ArrayList<>(Arrays.asList(a));
        for(A e: l) System.out.print(e.m(3) + " ");
    }
}
class A {
    int x;
    A(int x) { this.x = x + 1; }
    public int m(int z) { return x + z; }
}
class B extends A {
    B(int x) { super(x); }
    public int m(int z) { return super.m(z) * 2; }
}`,
            solution: ['4 10 6 14 ']
        },
        {
            code: `public class Test3 {
    public static void main(String[] args) {
        A obj = new B();
        obj.m(new D());
    }
}
class A {
    final void m(C c) { System.out.print("4"); }
}
class B extends A {
    void m(C c) { System.out.print("5"); }
    void m(D c) { System.out.print("6"); }
}
class C {}
class D extends C {}`,
            solution: {
                type: 'COMPILETIME',
                row: 11,
                cause: 'Non si può fare l\override di un metodo final'
            }
        },
        {
            code: `public class Test6 {
    static final ArrayList<A> l = new ArrayList<>();
    void doSomething(int x) {
        for(int i=0; i<x; i++) {
            B b = new B();
            b.m();
        }
    }
    void doSomethingElse() {
        for(int i=0; i<l.size(); i++) {
            A a = l.get(i);
            a++;
        }
    }
    public static void main(String[] args) {
        Test6 t = new Test6();
        t.doSomething(5);
        A a = new A();
        t.doSomethingElse();
    }
}
class A {
    A() { Test6.l.add(this); }
}
class B extends A {
    int x = 0;
    B() { super(); }
    void m() { x++; }
}`,
            solution: {
                type: 'COMPILETIME',
                row: 12,
                cause: 'Non si può usare l\'operatore ++ su un oggetto'
            }
        },
        {
            code: `public class Test8 {
    public static void main(String[] args) {
        B b1 = new B(new A());
        b1.m(3);
        B b2 = new B();
        b2.m(5);
        System.out.println(b2);
    }}
class A {
    static int x = 3;
    A() { x++; }
    void m(int x) { this.x += x; }
    public String toString() { return "x="+x; }
}
Class B {
    A a;
    B(A a) { this.a = a; }
    B() { super(); }
    void m(int x) { a.m(x); }
    public String toString() { return a.toString(); }
}`,
            solution: {
                type: 'RUNTIME',
                row: 20,
                cause: 'NullPointerException'
            }
        },
        {
            code: `public class Test7 {
    public static void main(String[] args) {
        A a = new A();
        a.ml(a.y);
        System.out.print("y="+a.y);
    }
}
class A {
    static int y = 10;
    void ml(int y) {
        y++;
        m2();
    }
    void m2() { ++y; }
}`,
            solution: ['y=11']
        },
        [
            {
                question: 'Un metodo generico è un qualsiasi metodo che contiene parametri di tipo Object nella propria definizione.',
                solution: false
            },
            {
                question: 'Sia data una classe Java A che contiene un metodo m(). Una sottoclasse B di A può ridefinire m() una sola volta mediante override e un numero arbitrario di volte mediante overload.',
                solution: true
            },
            {
                question: 'Con il termine "autoboxing" in Java ci si riferisce alla capacità di una finestra grafica di adattare automaticamente la propria dimensione (in pixel) al proprio contenuto.',
                solution: false
            },
            {
                question: 'In Java la parola chiave this serve a identificare un particolare elemento all’interno di un array.',
                solution: false
            },
            {
                question: 'Il tipo array int [] è un tipo riferimento, come le classi.',
                solution: true
            },
            {
                question: 'In Java esiste ereditarietà singola: quindi, un tipo interfaccia può ereditare da un solo tipo interfaccia.',
                solution: false
            },
            {
                question: 'In Java, se B è una sottoclasse di A l\'istruzione B a = new A(); genera errore a runtime.',
                solution: false
            },
            {
                question: 'Una classe Java definita come abstract può essere usata all\'interno di gerarchie di classi con ereditarietà multipla.',
                solution: false
            }
        ]
    ]
};

export default EXAM;
