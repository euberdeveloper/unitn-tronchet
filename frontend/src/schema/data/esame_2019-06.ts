import { Exam } from '../types/exam.interface';

const EXAM: Exam = {
    name: 'Esame - 06/2019',
    id: 'esame_2019-06',
    exercises: [
        {
            code: `public class Test {
    public static void main(String[] z) {
        B b = new B();
        A a = b;
        J j = a;
        System.out.println(j.m(5) + b.m("E.646"));
    }
}
interface I {
    int m(int z);
}
interface J extends I { }
class A implements I {
    int x = 3;
    public in m(int z) { return x + z; }
}
class B extends A implements J {
    public int m(String s) { return s.length(); }
}`,
            solution: {
                type: 'COMPILETIME',
                row: 5,
                cause: 'Assegnamento errato perchè A non implementa J'
            }
        },
        {
code: `import java.util.*;
public class Test {
    public static void main(String[] args) {
        List<A> ls = new ArrayList<>();
        ls.add(new A("banana"));
        ls.add(new A("kiwi"));
        ls.add(new A("avocado"));
        Collections.sort(ls);
        for(A s: ls)
            System.out.print(s.s.length());
    }
}
class A implements Comparable<A> {
    String s;
    A(String s) { this.s = s; }
    public int compareTo(A a) {
        return (s.length() - a.s.length());
    }
}`,
            solution: ['467']
        },
        {
            code: `public class Test {
    public static void main(String[] args) {
        A a = new A();
        a.m1(5);
        System.out.println("y="+a.y);
    }
}
class A {
    int y = 1;
    void m1(int y) { m2(y++); }
    void m2(int y) { --y; }
}`,
            solution: ['y=1\\n']
        },
        {
            code: `public class Test {
    public static void main(String[] args) {
        A a = new C(3);
        I i = a;
        System.out.println(i.m(5));
    }
}
interface I {
    int m(int z);
}
class A implements I {
    int x;
    A(int x) { this.x = x + 1; }
    public int m(int z) { return x * z; }
}
class B extends A {
    B(int x) { super(x); }
    public int m(int z) { return x + z; }
}
class C extends B {
    C(int x) { super(x); }
    public int m(int z) { return super.m(z)+2; }
}`,
            solution: ['11\\n']
        },
        {
            code: `public class G0 {
    public static void main(String x[]) {
        G1 g1 = new G1(3);
        G1 g2 = new G1(4);
        G2 g3 = new G2(2);
        G2 g4 = new G2(1);
        System.out.println(g1.x+" "+g2.x+" "+g3.x+" "+g4.x);
    }
    public static void main(String x) {
        G2 g1 = new G2(2);
        System.out.println(g1.x);
    }
}
class G1 {
    static int x=3;
    G1(){x--;}
    G1(int x) {
        this.x=x;
    }
}
class G2 extends G1 {
    int x=0;
    G2(int x) {
        this.x=x;
    }
}`,
            solution: ['2 2 2 1\\n']
        },
        {
            code: `import java.util.*;
public class Test {
    public static void main(String[] a) {
        Test t = new Test();
        System.out.println(t.m(5, 5));
    }
    int m(int a, int b) {
        int m = 3;
        ArrayList<Integer> l = new ArrayList<>();
        Set<Integer> s = new HashSet<>();
        for(int i=0; i<a; i++)
            l.add(i);
        for(int i=m; i<b+m; i++)
            s.add(i);
        s.addAll(l);
        return s.size();
    }
}`,
            solution: ['8\\n']
        },
        {
            code: `public class Test {
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
                cause: 'Assegnamento errato perchè x è privata'
            }
        },
        {
            code: `public class Test {
    public static void main(String[] args) {
        A a1 = new A(3);
        A a2 = new A(3);
        boolean b = (a1 == a2);
        System.out.println(b);
    }
}
class A {
    int x;
    A(int x) { this.x = x; }
}`,
            solution: ['false\\n']
        },
        [
            {
                question: 'Il costruttore di una classe chiama automaticamente il costruttore della superclasse con gli stessi parametri; se in questa non è disponibile un costruttore con la stessa firma, viene chiamato il costruttore senza parametri.',
                solution: false
            },
            {
                question: 'Un metodo generico è un qualsiasi metodo che contiene parametri di tipo Object nella propria definizione.',
                solution: false
            },
            {
                question: 'In una classe vi possono essere più modi con lo stesso nome ma firme (numero e tipo dei parametri) diverse.',
                solution: true
            },
            {
                question: 'Se a.equals(b) è false, non può essere a.hashCode==b.hashCode.',
                solution: false
            },
            {
                question: 'In Java esiste ereditarietà singola: quindi un tipo interfaccia può ereditare da un solo tipo interfaccia.',
                solution: false
            },
            {
                question: 'Si consideri un attributo x dichiarato come protected nella classe C del package P1; x non è visibile da una classe D appartenente a un package P2, a meno che D non erediti da C.',
                solution: true
            },
            {
                question: 'Sia I un\'interfaccia, e C una classe che la implementa. L\'assegnamento C c = new I(); non causa errori in compilazione, ma può generare errori a runtime.',
                solution: false
            },
            {
                question: 'Le istruzioni Object[] x = new Object[10]; x[0] = "elemento"; sono illegali in Java, perchè per gli array non è supportato il polimorfismo; questo è il motivo principale per l\'esistenza del Java Collection Frameword, che invece supporta questa funzionalità.',
                solution: false
            }
        ]
    ]
};

export default EXAM;
