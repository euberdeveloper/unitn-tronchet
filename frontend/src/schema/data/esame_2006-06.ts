import { Exam } from '../types/exam.interface';

const EXAM: Exam = {
    name: 'Esame - 06/2006',
    id: 'esame_2006-06',
    exercises: [
        {
            code: `import java.util.*;
class A {
    private static A a;
    private static int instancecount=0;
    private A() {instancecount++;}
    static A getInstance() {if (a==null) a=new A(); return a;}
    void printCount(){System.out.println(instancecount);}
}
public class Prova {
    public static void main(String args[]) {
        Collection s = new LinkedList();
        for (int i = 1; i < 4; i++) s.add(A.getInstance());
        Iterator i = s.iterator();
        while (i.hasNext()) ( (A) i.next()).printCount();
    }
}`,
            solution: ['1\\n1\\n1\\n']
        },
        {
            code: `import java.util.*;
class A {
    private static A a;
    private static int instancecount=0;
    private A() {instancecount++;}
    static A getInstance() {
        if (a==null) a=new A();
        return a;
    }
    void printCount(){System.out.println(instancecount);}
}
public class Prova {
    public static void main(String args[]) {
        Collection s = new HashSet();
        for (int i = 1; i < 4; i++) s.add(new A());
        Iterator i = s.iterator();
        while (i.hasNext()) ( (A) i.next()).printCount();
    }
}`,
            solution: {
                type: 'COMPILETIME',
                row: 13,
                cause: 'Il costruttore di A è privato'
            }
        },
        {
            code: `package esame; // NOTA :QUESTA CLASSE E’ NEL FILE A.java
public class A {
    int x=1;
    public static void main(String string[]) {
        (new abcd.B()).f();
    }
}
package abcd; // NOTA :QUESTA CLASSE E’ NEL FILE B.java
public class B extends esame.A{
    public void f(){
        System.out.println(++x);
    }
}`,
            solution: {
                type: 'COMPILETIME',
                row: 11,
                cause: 'x ha visibilità package ed appartiene ad un altro package'
            }
        },
        {
            code: `#include <iostream.h>
void f(char *x, int * y) {
    (*y)++;
    x[*y]++; }
void g(char x[], int y) {
    y--;
    x[y]--; }
int main(){
    char x[2];
    int y;
    x[0]='B'; x[1]='C'; y=0;
    f(x,&y);
    g(x,y);
    cout<<x[0]<<" "<<x[1]<<" "<<y;
    return 0; }`,
            solution: ['A D 1']
        },
        {
            code: `package uno;
public class A {
    void f(int k) {
        System.out.print(k*3);
    }
    public static void main (String args[]){
        Object z = new B();
        if (z instanceof uno.A) ((A) z).f(1);
        if (z instanceof uno.B) ((B) z).f(2);
    }
}
class B extends A{
    void f(int k) {
        System.out.print(k);
    }
}`,
            solution: ['12']
        },
        {
            code: `class A {
    A(int x) {System.out.print("X");}
    A() {System.out.print("Y");}
    public void finalize() {System.out.print("Z");}
}
class B extends A {
    B(int x) {System.out.print("A");}
    B() {System.out.print("B");}
    public void finalize() {System.out.print("C");}
}
public class Prova {
    public static void main(String args[]) {
        A a=new B(3);
        a = null;
        System.gc();
        System.runFinalization();
    }
}`,
            solution: ['YAC']
        },
        {
            code: `package uno;
public class A {
    int x=10;
    A(){int x=12; new B();}
    public static void main(String args[]){
        int x=11;
        new A();
    }
    class B{
        B() {System.out.println(x);}
    }
}`,
            solution: ['10']
        },
        {
            code: `class A {
int x = 3;
class B {
    int x = 4;
    B(int x) { System.out.print(x); }
}
A(int x) { new B(x); System.out.print(x); }
A(int y) { new B(y); System.out.print(y-4); }
A() { new B(x); System.out.print(x); }
public static void main(String s[]) {
    A a=new A(3); }
}`,
            solution: {
                type: 'COMPILETIME',
                row: 8,
                cause: 'Esiste già un altro metodo con firma uguale'
            }
        },
        [
            {
                question: 'Poichè Java usa sempre dynamic binding, esso usa sempre la heap e mai lo stack.',
                solution: false
            },
            {
                question: 'Il garbage collector di Java sospende l’esecuzione del programma finchè non ha finito di liberare la memoria.',
                solution: false
            },
            {
                question: 'Un costruttore non può mai essere protected.',
                solution: false
            },
            {
                question: 'Di default l’operatore = = e il metodo equals fanno la stessa cosa.',
                solution: true
            },
            {
                question: 'Un oggetto ed un suo clone sono identici.',
                solution: false
            },
            {
                question: 'Se A è padre di B la scrittura B a=new A(); genera errore a compiletime.',
                solution: true
            },
            {
                question: 'Se A è padre di B la scrittura A a=(A)(new B()); genera errore a runtime.',
                solution: false
            },
            {
                question: 'Il main può accedere a qualunque variabile di istanza della classe in cui è contenuto.',
                solution: false
            }
        ],
    ]
};

export default EXAM;
