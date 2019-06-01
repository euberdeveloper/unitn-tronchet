import { Exam } from '../types/exam.interface';

const EXAM: Exam = {
    name: 'Esame - 09/2011',
    id: 'esame_2011-09',
    exercises: [
        {
            code: `public class B implements Cloneable{
    int k=0;
    public Object clone() {
        Object copia=null;
        try {
            copia=super.clone();
        } catch (CloneNotSupportedException ex) {
            System.exit(0);
        }
        ((B)copia).k++;
        return copia;
    }
    public boolean equals(Object x) {
        if (! (x instanceof B)) return false;
        return k==((B)x).k;
    }
    public static void main(String[] args) {
        B b= new B();
        B c=(B)b.clone();
        B d=new B();
        if (b.equals(c)) System.out.print("Z");
        if (c.equals(d)) System.out.print("Y");
        if (d.equals(b)) System.out.print("X");
}}`,
            solution: ['X']
        },
        {
            code: `class A {
    A(int x) {System.out.print("A");}
    A() {System.out.print("S");}
    public void finalize() {System.out.print("U");}
}
public class B extends A {
    B(int x) {System.out.print("T");}
    B() {System.out.print("H");}
    public void finalize() {System.out.print("P");}
    public static void main(String args[]) {
        A a=new B(3);
        a = null;
        System.gc();
        System.runFinalization();
    }
}`,
            solution: ['STP']
        },
        {
            code: `class B {
static int s=0;
B(int i){s=i;}
public static void main(String[] args) {
    B b1=new B(3);
    B b2=new B(3);
    B b3=new B(1);
    if (b1.equals(b2)) System.out.print("3"),
        else System.out.print("1");
    if (b1.s==b3.s) System.out.print("3");
        else System.out.print("1");
}   }`,
            solution: ['13']
        },
        {
            code: `public class B {
       String a[10];
       void initialize(){
           for (int k=9;k>=0;--k) a[k]=""+k;
       }
       void stampa(int k){
           System.out.println(a[k]);
       }
       B() {initialize(); stampa(0); }
       public static void main(String a[]){
           new B();
       }
       public static void main(String a){
           new B();
       }
   }`,
            solution: {
                type: 'COMPILETIME',
                row: 2,
                cause: 'Errata inizializzazione di un array'
            }
        },
        {
            code: `public class B {
    static String k="pluto";
    public static void main(String a[]){
        new B();
        initialize("pippo");
        System.out.println(k);
    }
    void main(){
        new B();
    }
    void initialize(String s){k=s;}
}`,
            solution: {
                type: 'COMPILETIME',
                row: 5,
                cause: 'Il main statico non può accedere a metodi di istanza'
            }
        },
        {
            code: `class C{
    void f() {
        System.out.println("R");
    }
}
public class B extends C{
    public void f() {
        System.out.println("P");
    }
    public static void main(String[] args) {
        C quattro1 = new B();
        quattro1.f();
    }
    public static void main(String args) {
        C αλθα = new C();
        αλθα.f();
    }}`,
            solution: ['P\n']
        },
        {
            code: `class B {
    public static void main(String args[]) {
        int i,j,k,l=8;
        k = l++;
        j = ++k;
        i = j++;
        System.out.print(i);
    }
}`,
            solution: ['9']
        },
        {
            code: `public class B {
    void f(int k) {
        System.out.print(k*3);
    }
    public static void main (String args[]) {
        Object z = new A();
        if (z instanceof B) ((B) z).f(4);
        if (z instanceof A) ((A) z).f(2);
    }
}
class A extends B{
    void f(int k) {
        System.out.print(k*2);
    }
}`,
            solution: ['84']
        },
        [
            {
                question: 'In Java non esistono le variabili globali.',
                solution: true
            },
            {
                question: 'Una classe figlia può fare overloading di un metodo final della classe padre.',
                solution: true
            },
            {
                question: 'Una classe figlia può fare l\'overriding di un metodo final della classe padre.',
                solution: false
            },
            {
                question: 'Se una classe è astratta è permesso usarla per effettuare ereditarietà multipla.',
                solution: false
            },
            {
                question: 'Due oggetti per cui equals è vera possono avere variabili pubbliche con valori differenti.',
                solution: false
            },
            {
                question: 'Due oggetti per cui equals è vera sono sempre identici.',
                solution: false
            },
            {
                question: 'Se una Collection è specializzata tramite una generic gli oggetti estratti dal relativo iteratore non richiedono un cast.',
                solution: true
            },
            {
                question: 'Java usa solo la heap e non lo stack.',
                solution: false
            }
        ]
    ]
};

export default EXAM;
