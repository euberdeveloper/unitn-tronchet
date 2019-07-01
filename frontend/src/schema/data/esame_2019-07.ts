import { Exam } from '../types/exam.interface';

const EXAM: Exam = {
    name: 'Esame - 07/2019',
    id: 'esame_2019-07',
    exercises: [
        {
            code: `public class T2 {
    public static void main(String[] args) {
        A1 obj = new B1();
        A1 par = new B1();
        System.out.println(obj.m(par));
    }
}
class A1 {
    int x = 0;
    String m(A1 a) {
        return "a in a";
    }
}
class B1 extends A1 {
    String m(A1 a) {
        return "a in b";
    }
    String m(B1 b) {
        return "b in b";
    }
}`,
            solution: ['a in b']
        },
        {
code: `import java.util.*;
public class T5 {
    T5(){
        Collection<String> a = new ArrayList<String>();
        Collection<String> b = new HashSet<String>();
        for (int k=0;k<10;k++) {
            String s="A"+(k%4);
            a.add(s);
            b.add(s);
        }
        System.out.println(a.size()+" "+b.size());
    }
    public static void main(String[] a) { new T5(); }
}`,
            solution: ['10 4']
        },
        {
            code: `public class T6 {
    public static void main(String[] args) {
        A6 a = new A6();
        a.m1(5);
        System.out.println(a.y+" "+a.z);
    }
}
class A6 {
    static int z=2;
    int y = 3;
    void m1(int y) { m2(y++); }
    void m2(int z) { --z; }
}`,
            solution: ['3 2']
        },
        {
            code: `public class T1 {
    public static void main(String[] args) {
        A a = new B();
        B b = new B();
        J j = b;
        if (a.equals(b))
            System.out.println(j.m(5) + b.m("banana"));
        else
            System.out.println(j.m(5));
    }
    public static void main(String args) {
        I i = new B();
        System.out.println(i.m(5)+ ((B)i).m("pera"));
    }
}
interface I { int m(int z);}
interface J extends I {}
class A implements I {
    int x = 2;
    public int m(int z) {
        return x + z;
    }
    public boolean equals(Object o) {
        A obj = (A) o;
        return x == obj.x;
    }
}`,
            solution: {
                type: 'COMPILETIME',
                row: 3,
                cause: 'Classe B non definita'
            }
        },
        {
            code: `public class T3 {
    public static void main(String[] args) {
        A2 a = new A2(10);
        a.m("adige");
        A2 a1 = new C2();
        C2 c1 = (C2) a1;
        c1.m("arno");
        A2 a2 = new C2();
        C2 c2 = (C2) a2;
        c2.m("tevere");
    }
}
class A2 {
    static int n=0;
    int x=3;
    A2(int x) { this.x = x; }
    public void m(String s) { System.out.print(s.length() * x); }
}
class B2 extends A2 {
    B2() {}
}
class C2 extends B2 {}`,
            solution: {
                type: 'COMPILETIME',
                row: 20,
                cause: 'Costruttore della superclasse A2 non richiamato'
            }
        },
        {
            code: `public class T3 {
    public static void main(String[] args) {
        A2 a = new A2(10);
        a.m("adige");
        A2 a1 = new C2();
        C2 c1 = (C2) a1;
        c1.m("arno");
        A2 a2 = new C2();
        C2 c2 = (C2) a2;
        c2.m("tevere");
    }
}
class A2 {
    static int n=0;
    int x=2;
    A2(int x) { this.x = x; }
    public void m(String s) { System.out.print(s.length() * x); }
}
class B2 extends A2 {
    B2() { super(n++);}
}
class C2 extends B2 {}`,
            solution: ['5006']
        },
        {
            code: `public class T3 {
    public static void main(String[] args) {
        A2 a = new A2(10);
        a.m("adige");
        A2 a1 = new C2();
        C2 c1 = (C2) a1;
        c1.m("arno");
        A2 a2 = new B2();
        C2 c2 = (C2) a2;
        c2.m("tevere");
    }
}
class A2 {
    static int n=0;
    int x=1;
    A2(int x) { this.x = x; }
    public void m(String s) { System.out.print(s.length() * x); }
}
class B2 extends A2 {
    B2() { super(n++);}
}
class C2 extends B2 {}`,
            solution: {
                type: 'RUNTIME',
                row: 9,
                cause: 'Non si può fare il cast da classe padre a classe figlia'
            }
        },
        {
            code: `public class T4 {
    static int x=5;
    public static void main(String[] args) {
        System.out.print(x+"[");
        T4 a5=new T4(); a5.f();
        a5=new T4();    a5.f();
        System.gc();    System.runFinalization();
        System.out.println("]"+x);
    }
    void f() {Pippo a=new Pippo2();
    }
    public void finalize() { System.out.print("z"); }
    class Pippo {
        int k;
        Pippo() {k=++x;}
        public void finalize() { System.out.print(k); }
    }
    class Pippo2 extends Pippo {
        Pippo2() {k=x++;}
    }
}`,
            solution: [
                '4[86z]9',
                '4[8z6]9',
                '4[68z]9',
                '4[6z8]9',
                '4[z86]9',
                '4[z68]9',
                '4[]986z',
                '4[]98z6',
                '4[]968z',
                '4[]96z8',
                '4[]9z86',
                '4[]9z68',
            ]
        },
        [
            {
                question: 'L\'esistenza in una classe di un metodo f(int x) e di uno f(String s) è un esempio di overloading.',
                solution: true
            },
            {
                question: 'La parola cihave finally serve a terminare l\'esecuzione del programma.',
                solution: false
            },
            {
                question: 'Java non supporta i puntatori: pertanto, è supportata solo l\'allocazione statica della memoria sullo stack e non quella dinamica sullo heap.',
                solution: false
            },
            {
                question: 'Il garbage collector è una funzionalità del supporto run-time di Java molto utile, in quanto gestisce in maniera automatica la deallocazione di oggetti non pià utilizzati dal programma, semplificando il lavoro del programmatore ed evitandone potenziali errori.',
                solution: true
            },
            {
                question: 'In Java, se A è una sottoclasse di B, l\'istruzione B a = new A(); genera errore a compile time.',
                solution: false
            },
            {
                question: 'In Java, se B è una sottoclasse di A l\'istruzione B a = new A(); genera errore a runtime.',
                solution: false
            },
            {
                question: 'Con il termine "autoboxing" in Java ci si riferisce alla capacità di una finestra grafica di adattare automaticamente la propria dimensione (in pixel) al proprio contenuto.',
                solution: false
            },
            {
                question: 'Un metodo static di una classe C può essere invocato senza che sia stata creata un\'istanza (oggetto) di C.',
                solution: true
            }
        ]
    ]
};

export default EXAM;
