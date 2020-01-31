import { Exam } from '../types/exam.interface';

const EXAM: Exam = {
    name: 'Esame - 01/2020',
    id: 'esame_2020_01',
    exercises: [
        {
            code: `public class Test {
    public static void main(String[] args) {
        A a = new A();
        B b = a.m(5);
        b.m();
    }
}
class A {
    B m(int x) { return new B(x); }
}
class B {
    int x;
    B(int x) { this.x = x; }
    void m() { if (x%2 != 0) throw new MyException(); }
}
class MyException extends Exception {}`,
            solution: {
                type: 'COMPILETIME',
                row: 14,
                cause: 'MyException deve essere gestita, non essendo una RuntimeException'
            }
        },
        {
            code: `public class Test {
    public static void main(String[] args) {
        B b1 = new B(new A());
        b1.m(2);
        B b2 = new B(new A());
        b2.m(4);
        System.out.println(b2);
    }
}
class A {
    static int x = 2;
    void m(int x) { this.x += x; }
    public String toString() { return "x="+x; }
}
class B {
    A a = null;
    B(A a) { this.a = a; }
    void m(int x) { a.m(x); }
    public String toString() { return a.toString(); }
}`,
            solution: ['x=8']
        },
        {
            code: `public class Test {
    public static void main(String[] args) {
        A a = new B();
        B b = new B();
        J j = b;
        if (a.equals(b))
            System.out.println(j.m(1) + b.m("scritto"));
        else System.out.println(j.m(3));
    }
}
interface I {
    int m(int z);
}
interface J extends I {}

class A implements I {
    int x = 10;
    public int m(int z) { return x + z; }
    public boolean equals(Object o) {
        A obj = (A) o;
        return x == obj.x;
    }
}
class B extends A implements J {
    public int m(String s) { return s.length(); }
}`,
            solution: ['18']
        },
        {
            code: `import java.util.*;

 public class Test {
     public static void main(String[] args) {
         List<A> ls = new ArrayList<>();
         ls.add(new A("emu")); ls.add(new A("coniglio")); ls.add(new A("pipistrello"));
         Collections.sort(ls);
         for(A a: ls)
             System.out.println(a.s.length());
     }
 }
 class A implements Comparable<A> {
     String s;
     A(String s) { this.s = s; }
     public int compareTo(A a) {
         return (s.length() - a.s.length());
     }
 }`,
            solution: ['3\n8\n11\n']
        },
        {
            code: `public class Test {
    public static void main(String[] args) {
        A a = new A();
        System.out.println(a);
    }
}
class A {
    private B b;
    public String toString() { return b.toString(); }
}
class B {
    private int x;
    public String toString() { return Integer.toString(x); }
}`,
            solution: {
                type: 'RUNTIME',
                row: 9,
                cause: 'NullPointerException, b è null, non si può farne il toString()'
            }
        },
        {
            code: `public class Test {
    public static void main(String[] args) {
        A obj = new B();
        obj.m(new D());
    }
}
class A {
    void m(C c) { System.out.println("g"); }
}
class B extends A {
    void m(C c) { System.out.println("h"); }
    void m(D c) { System.out.println("i"); }
}
class C { }
class D extends C { }`,
            solution: ['h']
        },
        {
            code: `public class Test {
    public static void main(String[] args) {
        A a = new C();
        a.doSomething();
        I i1 = new C();
        i1.aMethod();
        I i2 = new D();
        i2.aMethod();
        B b = new D();
        ((D) b).aMethod();
    }
}
interface I {
    void aMethod();
}
class A implements I {
    int x;
    void doSomething() {}
    public void aMethod() {}
}
class B {}
class C extends A {}
class D extends B {
    void aMethod() {}
}`,
            solution: {
                type: 'COMPILETIME',
                row: 7,
                cause: 'D non è convertibile nel tipo I'
            }
        },
        {
            code: `import java.util.*;
public class Test {
    public static void main(String[] args) {
        List<A> l = new ArrayList<>();
        for(int c=0; c<10; c++)
            if(c%3 == 0) l.add(new A());
            else if(c%2 == 0) l.add(new B());
            else l.add(new C());
        for(A a: l) {
            a.setAttribute();
            System.out.print(a);
        }
    }
}
class A {
    String str = null;
    public void setAttribute() { str = "0"; }
    public String toString() { return str; }
}
class B extends A {
    public void setAttribute() { str = "1"; }
}
class C extends A {}`,
            solution: ['0010100010']
        },
        [
            {
                question: 'La notazione <?> in Java indica che un parametro non è noto all\'atto della compilazione del codice e verrà invece richiesto e inserito dall\'utente a run-time, durante l\'esecuzione del programma.',
                solution: false
            },
            {
                question: 'La coercizione di tipo (cast) presente in altri linguaggi quali il C è vietata in Java, in quanto potenziale fonte di errori. Pertanto, un\'istruzione A a = (B) b; dà sempre un errore in compilazione, indipendentemente dalla definizione dei tipi A e B.',
                solution: false
            },
            {
                question: 'In Java, se B è una sottoclasse di A l\'istruzione B a = new A(); genera errore a runtime.',
                solution: false
            },
            {
                question: 'Il tipo int[] è un tipo riferimento, come le classi.',
                solution: true
            },
            {
                question: 'Un tipo generico è una classe che contiene attributi di tipo Object nella propria definizione.',
                solution: false
            },
            {
                question: 'Le variabili dichiarate static sono modificabili anche da metodi private.',
                solution: true
            },
            {
                question: 'Sia data una classe Java A che contiene un metodo m(). Una sottoclasse B di A può ridefinire m() una sola volta mediante override e un numero arbitrario di volte mediante overload.',
                solution: true
            },
            {
                question: 'Con il termine "autoboxing" in Java ci si riferisce alla capacità di una finestra grafica di adattare automaticamente la propria dimensione (in pixel) al proprio contenuto.',
                solution: false
            }
        ]
    ]
};

export default EXAM;
