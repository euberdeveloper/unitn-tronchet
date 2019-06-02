import { Exam } from '../types/exam.interface';

const EXAM: Exam = {
    name: 'Esempio 1',
    id: 'esempio_1',
    exercises: [
        {
            code: `public class Tre {
    class A {
        public A(int k) {System.out.print(k);}
        public void finalize() {System.out.print("C");}
    }
    class B extends A {
        public B(int k) {System.out.print(k);}
        public void finalize() {System.out.print("B");}
    }
    public static void main (String z[]){
        new Tre();
    }
    Tre(){
        A a=new B(3);
        B b=(B)a;
        a=null;
        b=new B(3);
        System.gc(); System.runFinalization();
} }`,
            solution: {
                type: 'COMPILETIME',
                row: 7,
                cause: 'Costruttore superclasse non chiamato'
            }
        },
        {
code: `#include <iostream>
using namespace std;
int x[] = {-2, -1, 0, 1, 2};
void f(int* x, int y[]) {
    x[*y] = -y[*x];
}
int main(int argc, char** argv) {
    int * p = x + 1;
    f(p, p);
    for (int * s = x; s < x + 5; s++) {
        cout << *s;
    }
    return 0;
}`,
            solution: ['2-1012']
        },
        {
            code: `public class F{
    int x=2;
    F(int x) {
        f(x);
        f();
        System.out.print(x);
    }
    void f() { x++; System.out.print(x);}
    void f(int x) { this.x++; x--;System.out.print(x);}
    public static void main(String arg[]) {
        F x=new F(3);
}}`,
            solution: ['243']
        },
        {
            code: `class SuperB{
    SuperB(){ System.out.print("S");}
    void f() { System.out.print("Z");}
}
public class B extends SuperB {
    B(){ System.out.print("B");}
    void f() { System.out.print("C");}
    public static void main(String args) {System.exit(1);}
    public static void main(String[] args) {
        SuperB b=new SuperB();
        B a=(B)b;
        a.f();
}}`,
            solution: {
                type: 'RUNTIME',
                row: 11,
                cause: 'Non si può fare il cast dall\'istanza della superclasse ad una sua classe figlia'
            }
        },
        {
            code: `public class Due {
    Collection<Due> s=new HashSet<Due>();
    static int k,j;
    Due(int k, int j) {this.k=k; this.j=j;}
    public boolean equals(Object d){
        return k-j==((Due)d).j-((Due)d).k;
    }
    public int hashCode(){return 1;}
    public static void main(String[] m){
        s.add(new Due(1,2)); s.add(new Due(0,1));
        s.add(new Due(2,1)); s.add(new Due(1,0));
        System.out.print(s.size());
        for (Due x:s){System.out.print(x.k+" "+x.j);}
} }`,
            solution: {
                type: 'RUNTIME',
                row: 10,
                cause: 'Un metodo statico non può accedere ai campi di istanza della stessa classe'
            }
        },
        {
            code: `class SuperB{
    SuperB(){ System.out.print("D");}
    void f() { System.out.print("Z");}
}
public class B extends SuperB {
    B(){ System.out.print("E");}
    void f() { System.out.print("O");}
    public static void main(String pippo) {System.exit(1);}
    public static void main(String[] args) {
        B b=new B();
        SuperB a=(SuperB)b;
        a.f();
}}`,
            solution: ['DEO']
        },
        {
            code: `public class Sei {
    char f() { return '6'; }
    public static void main(String e[]) {
        Sei a = new Sei();
        Sei b = new Sette();
        Sette c = new Sette();
        System.out.print(a.f() + " " + b.f() + " " + c.f() + " ");
        char ch[] = {'C', 'A', 'C', 'A', 'C','A'};
        int i1 = 0, i2 = 2, i3 = 4;
        if (a.equals(b)) i1++;
        if (b.equals(a)) i2++;
        if (c.equals(b)) i3++;
        System.out.print(ch[i1] + " " + ch[i2] + " " + ch[i3]);
} }
class Sette extends Sei {
    char f() { return '7'; }
    public boolean equals(Object a) {
        return (a instanceof Sei);
    }
    public int hashCode() { return 3; }
}`,
            solution: ['6 7 7 C A A']
        },
        {
            code: `public class Uno {
    static Collection c=new HashSet();
    public static void main(String a[]) {
        Collection c=new LinkedList();
        Uno u=new Uno();
        c.add(u); c.add(u); c.add(u);
        u.f();
        System.out.print(c.size());
        System.gc();System.runFinalization();
    }
    void f() {
        A a=new A("S");
        A b=new A("K");
        c.add(b);
    }
    class A {
        String s="";
        A(String s) {this.s=s; System.out.print(this);}
        public String toString(){return s;}
        public void finalize(){System.out.print(this);}
} }`,
            solution: ['SK3S']
        },
        [
            {
                question: 'Il metodo finalize() chiama automaticamente il corrispondente metodo della superclasse.',
                solution: false
            },
            {
                question: 'L\'esistenza in una classe di un metodo f(int x), e in una sua superclasse di un metodo f(String s) è un esempio di overriding.',
                solution: false
            },
            {
                question: 'L\'esistenza in una classe di un metodo f(int x) e di uno f(String s) è un esempio di overloading.',
                solution: true
            },
            {
                question: 'Se a.equals(b) è vero, deve essere a.hashCode==b.hashCode.',
                solution: true
            },
            {
                question: 'Se a.equals(b) è falso, deve essere a.hashCode!=b.hashCode.',
                solution: false
            },
            {
                question: 'Il costruttore chiama automaticamente il costruttore della superclasse con gli stessi parametri. Se nella superclasse non è disponibile un costruttore con la stessa firma, viene chiamato il costruttore vuoto.',
                solution: false
            },
            {
                question: 'int a[] è un oggetto.',
                solution: true
            },
            {
                question: 'In un programma ci possono essere due classi chiamate F.',
                solution: true
            }
        ]
    ]
};

export default EXAM;
