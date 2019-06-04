import { Exam } from '../types/exam.interface';

const EXAM: Exam = {
    name: 'Esame - 01/2019',
    id: 'esame_2019-01',
    exercises: [
        {
            code: `#include <cstdlib>
#include <iostream>
using namespace std;
int x = 11;
int f(int *x){ return ++(*x); }
int g(int y){ return f(&y) + f(&x); }
int main() {
    int a = 3;
    cout << g(a);
    cout << a;
    cout << x;
    return 0;
}`,
            solution: ['16312']
        },
        {
code: `public class Test2 {
    public static void main(String[] args) {
        A a = new B(3);
        C c = new C(3);
        System.out.println(a.m() + c.m());
    }
}
class A {
    private int x;
    int m() { return x + 1; }
}
class B extends A {
    B(int x) { this.x = x; }
    int m() { return x + 2; }
}
class C {
    int x = 0;
    A a = new A();
    C(int x) { this.x = a.x; }
    int m() { return x + 3; }
}`,
            solution: {
                type: 'COMPILETIME',
                row: 13,
                cause: 'B non può accedere ai campi privati di A'
            }
        },
        {
            code: `public class Test3 {
    public static void main(String[] args) {
        A obj = new B();
        obj.m(new D());
    }
}
class A {
    void m(C c) { System.out.println("1"); }
}
class B extends A {
    void m(C c) { System.out.println("2"); }
}
class C extends B {}
class D extends A {}`,
            solution: {
                type: 'COMPILETIME',
                row: 4,
                cause: 'Il metodo m richiede un C, non un D'
            }
        },
        {
            code: `public class Test4 {
    public static void main(String[] args) {
        A a = new B(7);
        I i = a;
        System.out.println(i.m(4));
    }
}
interface I {
    int m(int z);
}
class A implements I {
    int x;
    A(int x) { this.x = x - 1; }
    public int m(int z) { return x + z; }
}
class B extends A {
    B(int x) { super(x); }
    public int m(int z) { return x - z; }
}`,
            solution: ['2\\n']
        },
        {
            code: `public class Test5 {
    public static void main(String[] args) {
        B b = new B();
        A a = b;
        J j = a;
        System.out.println(j.m(5) + b.m("ciccio"));
    }
}
interface I {
    int m(int z);
}
interface J extends I {}

class A implements I {
    int x = 3;
    public int m(int z) { return x + z; }
}
class B extends A implements J {
    public int m(String s) { return s.length(); }
}`,
            solution: {
                type: 'COMPILETIME',
                row: 5,
                cause: 'A non implementa J'
            }
        },
        {
            code: `import java.util.*;
public class Test6 {
    static final int N = 10;
    public static void main(String[] a) {
        Test6 t = new Test6();
        t.m(N);
    }
    void m(int n) {
        List<Integer> la = new ArrayList<>();
        List<Integer> lb = new ArrayList<>();
        for(int i=0; i<N; i++)
            la.add(i);
        for(int i=0; i<2*N; i++)
            if (i%2==0) la.add(i);
        la.addAll(lb);
        System.out.println(la.size());
        Set<Integer> s = new HashSet<>();
        s.addAll(la);
        System.out.println(s.size());
    }
}`,
            solution: ['20\\n15\\n']
        },
        {
            code: `import java.util.*;
public class Test7 {
    public static void main(String[] args) {
        List<A> ls = new ArrayList<>();
        ls.add(new A("banana")); ls.add(new A("kiwi")); ls.add(new A("avocado"));
        Collections.sort(ls);
        for(A s: ls)
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
            solution: {
                type: 'COMPILETIME',
                row: 7,
                cause: 'a non è definito'
            }
        },
        {
            code: `public class Test8 {
    public static void main(String[] args) {
        A al = new A(5);
        A a2 = new A(al.m()/2);
        boolean b = (al == a2);
        System.out.print(b);
    }
}
class A {
    int x;
    A(int x) { this.x = x; }
    int m() { return x*2; }
}`,
            solution: ['false']
        },
        [
            {
                question: 'In una classe possono coesistere più metodi con lo stesso nome ma firme (numero e tipo dei parametri) diverse.',
                solution: true
            },
            {
                question: 'Il costruttore di una classe chiama automaticamente il costruttore della superclasse con gli stessi parametri; se in questa non è disponibile un costruttore con la stessa firma, viene chiamato il costruttore senza parametri.',
                solution: false
            },
            {
                question: 'Sia I un\'interfaccia, e C una classe che la implementa. L\'assegnamento C c = new I(); non causa errori in compilazione, ma può generare errori runtime.',
                solution: false
            },
            {
                question: 'Un attributo x dichiarato come public nella classe C del package P1 è visibile a tutte le altre classi dichiarate in P1, ma non a classi dichiarate in package diversi da P1.',
                solution: false
            },
            {
                question: 'Un\'interfaccia Java normalmente contiene solo la firma dei metodi; la loro definizione (corpo) nell\'interfaccia è opzionale.',
                solution: true
            },
            {
                question: 'Java non ha un distruttore (simile alla destroy del C++) per deallocare esplicitamente e direttamente oggetti in memoria.',
                solution: true
            },
            {
                question: 'Le istruzioni Object[] x = new Object[10]; x[0] = "elemento"; sono illegali in Java, perchè per gli array non è supportato il polimorfismo; questo è il motivo principale per l\'esistenza del Java Collection Framework, che invece supporta questa funzionalità.',
                solution: false
            },
            {
                question: 'Con il termine "autoboxing" in Java ci si riferisce alla capacità di una finestra grafica di adattare automaticamente la propria dimensione (in pixel) al proprio contenuto.',
                solution: false
            }
        ]
    ]
};

export default EXAM;
