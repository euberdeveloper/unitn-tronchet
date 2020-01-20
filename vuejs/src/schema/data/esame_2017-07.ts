import { Exam } from '../types/exam.interface';

const EXAM: Exam = {
    name: 'Esame - 07/2017',
    id: 'esame_2017-07',
    exercises: [
        {
            code: `public class Sei {
    char f() { return '6'; }
    public static void main(String e[]) {
        Sei a = new Sei();
        Sei b = new Sette();
        Sette c = new Sette();
        System.out.print(a.f() + " " + b.f() + " " + c.f() + " ");
        char ch[] = {'A', 'B', 'A', 'B', 'A', 'B'};
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
            solution: ['6 7 7 A B B']
        },
        {
            code: `import java.util.*;
public class Uno {
    static Collection c=new HashSet();
    public static void main(String a[]) {
        Collection c=new LinkedList();
        Uno u=new Uno();
        c.add(u); c.add(u);
        u.f();
        System.gc();System.runFinalization();
        System.out.println(c.size());
    }
    void f() {
        A a=new A("K");
        A b=new A("L");
        c.add(b);
    }
    class A {
        String s="";
        A(String s) {this.s=s; System.out.print(this);}
        public String toString(){return s;}
        public void finalize(){System.out.print(this);}
    } }`,
            solution: ['KLK2']
        },
        {
            code: `import java.util.*;
public class Due {
    static Collection<Due> s=new HashSet<Due>();
    int k,j;
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
    }
    public static void main(String m){
        s.add(new Due(1,0));
        System.out.print(s.size());
} }  `,
            solution: ['21 20 1']
        },
        {
            code: `import java.util.*;
public class Due {
    static Collection<Due> s=new HashSet<Due>();
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
            solution: ['41 01 01 01 0']// ['41 20 12 11 0']
        },
        {
            code: `import java.util.*;
public class Due {
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
                type: 'COMPILETIME',
                row: 11,
                cause: 'Non si possono chiamare attributi di istanza da metodi statici'
            }
        },
        {
            code: `public class Tre {
    class A {
        public A(int k) {System.out.print(k);}
        public void finalize() {System.out.print("A");}
    }
    class B extends A {
        public B(int k) {System.out.print(k);}
        public void finalize() {System.out.print("A");}
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
                cause: 'Costruttore della classe Padre non chiamato'
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
        System.out.println(x);
    }
    void f() { x++; System.out.print(x);}
    void f(int x) { this.x++; x--;System.out.print(x);}
    public static void main(String arg[]) {
        F x=new F(9);
}}`,
            solution: ['849']
        },
        [
            {
                question: 'int a[] è un oggetto.',
                solution: true
            },
            {
                question: 'Il metodo finalize() chiama automaticamente il corrispondente metodo della superclasse.',
                solution: false
            },
            {
                question: 'Il costruttore chiama automaticamente il costruttore della superclasse con gli stessi parametri. Se nella superclasse non è disponibile un costruttore con la stessa firma, viene chiamato il costruttore vuoto.',
                solution: false
            },
            {
                question: 'L\'esistenza in una classe di un metodo f(int x) e di uno f(String s) è un esempio di overloading.',
                solution: true
            },
            {
                question: 'L\'esistenza in una classe di un metodo f(int x), e in una sua superclasse di un metodo f(String s) è un esempio di overriding.',
                solution: false
            },
            {
                question: 'Una classe astratta può implementare al massimo una interfaccia.',
                solution: false
            },
            {
                question: 'Se una classe è astratta è permesso usarla per effettuare ereditarietà multipla.',
                solution: false
            },
            {
                question: 'In un programma ci possono essere più classi con lo stesso nome.',
                solution: true
            }
        ]
    ]
};

export default EXAM;
