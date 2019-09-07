import { Exam } from '../types/exam.interface';

const EXAM: Exam = {
    name: 'Esame Info-Org - 07/2019',
    id: 'esame_info_org_2019-07',
    exercises: [
        {
            code: `public class Test {
    public static void main(String[] args) {
        C obj = new C();
        int a = c.m1();
        int b = obj.m3();
    }
}
class C {
    static int x = 5;
    int y = 3;
    static public int m1() { return y + m2(); }
    static private int m2() { return x; }
    public int m3() { return m1(); }
}`,
            solution: {
                type: 'COMPILETIME',
                row: 11,
                cause: 'Un metodo statico non può usare campi d\'istanza'
            }
        },
        {
code: `public class Test {
    static String removeLast(String str) {
        // ritorna la stringa ottenuta rimuovendo l\'ultimo carattere dal parametro
        return str.substring(0, str.length() - 1);
    }
    public static void main(String[] args) {
        A obj1 = new A("milano");
        A obj2 =new B("torino");
        B obj3 = new B("verona");
        I obj4 = new B("trento");
        System.out.println(obj1.m() + "_" + obj2.m() + "_" + obj3.m() + "_" + obj4.m());
    }
}
interface I {
    public String m();
}
class A {
    String s;
    A(String s) { this.s = s; }
    public String m() { return Test.removeLast(s); }
}
public class B extends A implements I {
    B(String s) { super(s); }
    public String m() { return s; }
}`,
            solution: {
                type: 'COMPILETIME',
                row: 22,
                cause: 'Più di una classe pubblicha nello stesso file'
            }
        },
        {
            code: `import java.util.*;
public class Test {
    public static void main(String[] args) {
        List<A> l = new ArrayList<>();
        for(int c=0; c<10; c++)
            if(c%2 == 0) l.add(new A());
            else if(c%3 == 0) l.add(new B());
            else l.add(new C());
        for(A a : l) {
            a.setAttribute();
            System.out.println(a);
        }
    }
}
class A {
    String str = null;
    public void setAttribute() { str = "l"; }
    public String toString() { return str; }
}
class B extends A {
    public void setAttribute() { str = "2"; }
}
class C extends A { }`,
            solution: ['1\\n1\\n1\\n2\\n1\\n1\\n1\\n1\\n1\\n2\\n']
        },
        {
 code: `public class Test {
     public static void main(String [] args) {
         Z z = new Z();
         System.out.print(z.m());
     }
 }
 class X {
     static int s = 1;
     int x = 3;
     public int m() { s++; return x; }
 }
 class Y extends X {
     int y = 4;
     public int m() { s++; return super.m() + y; }
 }
 class Z extends Y {
     public int m() { s++; return super.m(); }
 }`,
            solution: ['7']
        },
        {
            code: `public class Test {
    public static void main(String [] args) {
        A a = new B();
        I i = new B();
        System.out.print(a.m(i));
    }
}
interface I {
    public int m(I obj);
}
class A implements I {
    public int m(I obj) { return 1; }
    public int m(A obj) { return 2; }
}
class B extends A {
    public int m(I obj) { return 3; }
    public int m(A obj) { return 4; }
    public int m(B obj) { return 5; }
}`,
            solution: ['3']
        },
        {
            code: `public class Test {
    public static void main(String[] args) {
        A obj1 = new B();
        I obj2 = new C();
        J obj3 = new B();
        J obj4 = new D();
        System.out.println(obj1.toString());
        System.out.println(obj2.m1());
        System.out.println(obj3.toString());
        System.out.println(obj4.m2());
    }
}
interface I {
    public int m1();
}
interface J {
    public int m2();
}
class A {
    int x = 5;
    public String toString() { return Integer.toString(x); }
}
class B extends A implements I {
    int y = 3;
    public int m1() { return y; }
}
class C extends B implements J {
    public int m2() {
        x = x * 2; return x;
    }
}
class D extends C {
    int z = 3;
    public String toString() { return Integer.toString(x * z); }
}`,
            solution: {
                type: 'COMPILETIME',
                row: 5,
                cause: 'B non implementa J'
            }
        },
        {
            code: `import java.util.*;
 public class Test {
     public static void main(String[] args) {
         String[] a = {"pera", "arancia", "fragola", "mela"};
         Set<Integer> s = new HashSet<>();
         List<Integer> l = new ArrayList<>();
         for(String i: a) {
             s.add(i.length());
             l.add(i.length());
         }
         System.out.println(s.size() + l.size());
     }
 }`,
            solution: ['6\\n']
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
                cause: 'NullPointerException: b vale null'
            }
        },
        [
            {
                question: 'Siano dati i tipi di riferimento A e B, e i tipi generici C<A> e C<B>. Se B è una sottoclasse di A allora C<B> è una sottoclasse di C<A>.',
                solution: false
            },
            {
                question: 'In Java esiste ereditarietà multipla fra interfacce: un tipo interfaccia può estendere uno o più tipi interfacce.',
                solution: true
            },
            {
                question: 'Siano dati due oggetti a e b, per i quali il test a.hashCode() == b.hashCode() ritorna true. In questo caso, si può stabilire con certezza che a e b sono identici, cioè puntano allo stesso oggetto.',
                solution: false
            },
            {
                question: 'Quando una classe C implementa un\'interfaccia I, deve fornire (o ereditare) l\'implementazione di tutti i metodi di I, oppure dichiarare C come abstract; in caso contrario, viene generato un errore in compilazione.',
                solution: true
            },
            {
                question: 'Nella gestione delle eccezioni in Java, un blocco try deve essere sempre seguito da almeno un blocco catch.',
                solution: true
            },
            {
                question: 'In Java la parola chiave final può essere impiegata nella testata del metodo di una classe per impedirne la ridefinizione in una sottoclasse.',
                solution: true
            },
            {
                question: 'La coercizione di tipo (cast) presente in altri linguaggi quali il C è vietata in Java, in quanto potenziale fonte di errori. Pertanto un\'istruzione A a = (B) b; dà sempre un errore in compilazione, indipendentemente dalla definizione dei tipi A e B.',
                solution: false
            },
            {
                question: 'Quando in Java si parla di un metodo overloaded si fa riferimentoa un metodo "sovraccarico", cioè la cui implementazione genera una compilazione particolarmente pesante.',
                solution: false
            }
        ]
    ]
};

export default EXAM;
