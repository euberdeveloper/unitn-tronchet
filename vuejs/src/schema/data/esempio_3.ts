import { Exam } from '../types/exam.interface';

const EXAM: Exam = {
    name: 'Esempio 3',
    id: 'esempio_3',
    exercises: [
        {
            code: `class A {
A(){System.out.print("A");}
A(int i) {System.out.print("A"+i);}
public void finalize() {System.out.print("Z");}
}
class B extends A{
B(){System.out.print("B");}
B(int i) {System.out.print("B"+i);}
public void finalize() {System.out.println("W");}
}
public class Main {
    public static void main(String[] args) {
        new B(3);
        System.gc();
    }
}`,
            solution: ['AB3W\\n']
        },
        {
code: `#include <iostream.h>
void f(char *x, int *y) {
    (*y)++;
    X[*y]++;    }
void g(char x[], int y) {
    y--;
    X[y]--; }
int main(){
    char x[2];
    int y;
    x[0]='D'; x[1]='Q'; y=0;
    f(x,&y);
    g(x,y);
    cout<<x[0]<<" "<<x[1]<<" "<<y;
    return 0;   }`,
            solution: {
                type: 'COMPILETIME',
                row: 4,
                cause: 'La variabile X non è definita'
            }
        },
        {
            code: `class B {
    int s=0;
    B(int s) {this.s=s;}
    public boolean equals(Object o) {
        return (s==((B)o).s);
    }   }
class A extends B {
    static int w=0;
    A() {
        super(++w);
    }}
public class Main {
    public static void main(String[] args) {
        B b1=new B(2);  B b2=new A();  A a=new A();
        if (b1.equals(b2)) System.out.print("A");
            else System.out.print("B");
        if (b1.equals(a)) System.out.print("C");
            else System.out.print("D");
  }   }`,
            solution: ['BC']
        },
        {
            code: `public class B {
    int s=0;
    B(int i){s=i;}
    public static void main(String[] args) {
        B b1=new B(3);
        B b2=new B(3);
        B b3=new B(1);
        if (b1.equals(b3)) System.out.print("A");
            else System.out.print("B");
        if (b2.equals(b3)) System.out.print("C");
            else System.out.print("D");
    }
}`,
            solution: ['BD']
        },
        {
            code: `interface A {
    int f(int x);
}
class B implements A {
    public int f(int w) {
        return w*2;
}}
class C extends B {
    int f(float w){
        return (int)(w*4);
}}
public class Main {
    public static void main(String[] args) {
        A a = new C();
        System.out.print(a.f(3));
}}`,
            solution: ['6']
        },
        {
            code: `public class Otto implements Cloneable{
    int k=0;
    public Object clone() {
        Object copia=null;
        try {
            copia=super.clone();
        } catch (CloneNotSupportedException ex) {
            System.exit(0);
        }
        ((Otto)copia).k++;
        return copia;
    }
    public boolean equals(Object x) {
        if (! (x instanceof Otto)) return false;
        return k==((Otto)x).k;
    }
    public static void main(String[] args) {
        Otto b= new Otto();
        Otto c=(Otto)b.clone();
        Otto d=new Otto();
        if (b.equals(c)) System.out.print("C");
        if (c.equals(d)) System.out.print("B");
        if (d.equals(b)) System.out.print("A");
}}`,
            solution: ['A']
        },
        {
            code: `public class Main { //Eseguito passando argomenti
    int MAIN=10;
    Main(){
        MAIN++;
    }
    void main(String args){
        MAIN--;
    }
    public static void main(String[] args) {
        Main maiN=new Main();
        maiN.MAIN++;
        maiN.main(args[0]);
        System.out.print(maiN.MAIN);
    }
}`,
            solution: ['11']
        },
        {
            code: `import java.util.*;
public class Sette {
    Sette(){
        Collection<String> a = new ArrayList<String>();
        Collection<String> b = new HashSet<String>();
        for (int k=0;k<10;k++) {
            String s="A"+(k%4);
            a.add(s);
            b.add(s);
        }
        int count=0;
        Iterator<String>i=a.iterator();
        while (i.hasNext()) {
            String s=i.next();
            count++;
        }
        i=b.iterator();
        while (i.hasNext()) {
            String s=i.next();
            count++;
        }
        System.out.print(count);
    }
    public static void main(String[] a) {
        new Sette();
}}`,
            solution: ['14']
        },
        [
            {
                question: 'Su qualunque oggetto si può chiamare il metodo clone per ottenerne una copia.',
                solution: false
            },
            {
                question: 'Il metodo equals applicato a due oggetti della stessa classe restituisce true se i due oggetti hanno lo stesso stato.',
                solution: false
            },
            {
                question: 'Da un punto di vista di efficienza di esecuzione lo static binding è meglio del dynamic binding.',
                solution: true
            },
            {
                question: 'A differenza del C, Java usa solo la heap e non lo stack.',
                solution: false
            },
            {
                question: 'Un oggetto ed un suo clone sono identici.',
                solution: false
            },
            {
                question: 'Ogni metodo di una classe java può leggere il valore di una qualunque variabile di istanza della classe stessa.',
                solution: false
            },
            {
                question: 'Esistono metodi che possono essere eseguiti anche senza creare istanze di una classe.',
                solution: true
            },
            {
                question: 'L\' ereditarietà multipla è ammessa per le interfacce.',
                solution: false
            }
        ]
    ]
};

export default EXAM;
