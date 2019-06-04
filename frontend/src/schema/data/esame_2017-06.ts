import { Exam } from '../types/exam.interface';

const EXAM: Exam = {
    name: 'Esame - 06/2017',
    id: 'esame_2017-06',
    exercises: [
        {
            code: `public class C {
    int s=4;
    void f() {System.out.print("A"+(++s));}
    public static void main(String[]a){
        C y=new C();
        C x=new C() {
            void f() {System.out.print("B"+(--s));}
        };
        x.f();
        y.f();
    }
    public static void main(String a){
        C y=new C();
    }
}`,
            solution: ['B3A5']
        },
        {
            code: `using namespace std;
#include <cstdlib>
#include <iostream>
void f(int x[4],int value){ x[0]+=value; }
void g(int x,int value){ x+=value; }
int main(int argc, char** argv) {
    int z=5;
    int a[]={1,2,3,4,5,6,7,8,9};
    g(z,1);
    f(&z,3);
    f(a+3,3);
    g(a[3],4);
    cout<<z<<" "<<a[3];
    return 0;
}`,
            solution: ['8 7']
        },
        {
            code: `class A1 {int x=2; }
class B1 extends A1 {int k=1;}
public class E1 {
    public static void main(String[] args) {
        A1 a1=new B1();
        A1 a2=(A1)(new B1());
        B1 b1=new A1();
        System.out.println(a1.x+a2.x+b1.x);
    }
}`,
            solution: {
                type: 'COMPILETIME',
                row: 7,
                cause: 'Assegnazione di classe Padre a classe Figlio'
            }
        },
        {
            code: `public class E6 {
    static Collection ll = new LinkedList();
    int x=1;
    E6(int x){
        ll.add(this);
        ll.add(new E6A());
    }
    public static void main(String z[]) {
        new E6(3);
        Iterator iter = ll.iterator();
        while (iter.hasNext()) {
            ((E6)(iter.next())).f();
    }}
    public void f() { System.out.print(x); }
    public static void main(String z) {
        new E6A();
        System.out.print(ll.size());
}}
class E6A extends E6 {
    E6A(){x++;}
    public void f() {
        x++; super.f(); System.out.print(2);
}}`,
            solution: ['132']
        },
        {
            code: `public class D {
    static int x=3;
    public static void main(String[] args) {
        D a5=new D();   a5.f();
        a5=new D();     a5.f();
        System.gc();    System.runFinalization();
    }
    void f() {Pippo a=new Pippo2();
    }
    public void finalize() { System.out.print("X"); }
    class Pippo {
        int k;
        Pippo() {k=++x;}
        public void finalize() {System.out.print(k);}
    }
    class Pippo2 extends Pippo {
        Pippo2() {k=x++;}
    }
}`,
            solution: [
                'X46',
                'X64',
                '64X',
                '6X4',
                '46X',
                '4X6'
            ]
        },
        {
            code: `import java.util.*;
public class E2 {
    static HashSet hs=new HashSet();
    public int hashCode() {return 0;}
    public boolean equals(Object x) {
        return (x.getClass().equals(this.getClass()));}
    public static void main(String s[]){
        f(new E2()); f(new E2()); f(new A2());
        f(new A2()); f(new A3()); f(new A3());
    }
    static void f(E2 x) {int v=0;
        if (hs.add(x)) v=1; System.out.print(v);
    }
}
class A2 extends E2 {
    public boolean equals(Object x) {return x instanceof A2;}
}
class A3 extends A2 {}`,
            solution: ['101000']
        },
        {
            code: `import java.util.*;
class E3 {
    static int counter=0;
    private int value=0;
    E3(){value=++counter;}
    public String toString(){
        return this.getClass().getName()+value+" ";}
    public void finalize(){System.out.print("F"+value);}
}
public class G extends E3{
    public static void main(String d[]){
        LinkedList<E3> x=new LinkedList<E3>();
        E3 a1=new G();
        G a2=new G();
        E3 a3=new E3();
        x.add(a1);x.add(a3);
        a1=null; a3=null; a2=null;
        Iterator<E3> it=x.iterator();
        while (it.hasNext()){System.out.print(it.next());}
        System.gc();System.runFinalization();
}}`,
            solution: ['NomePackage.G1 NomePackage.E33 F2 ']
        },
        {
            code: `public class E4 {
    int x=2;
    E4(int x) {
        f(x); f();
        System.out.print(x);
    }
    void f() { x++; System.out.print(x);}
    void f(int x) {this.x++; x--; System.out.print(x);}
    public static void main(String arg[]) {
        int x=2;
        new E4(2);
}}`,
            solution: ['142']
        },
        [
            {
                question: 'Se a.hashCode!=b.hashCode, a.equals(b) deve essere falsa.',
                solution: true
            },
            {
                question: 'Nel main si può leggere una qualunque variabile di istanza della classe in cui è contenuto.',
                solution: false
            },
            {
                question: 'Ereditarietà multipla è permessa con le interfacce e le classi astratte.',
                solution: false
            },
            {
                question: 'E\' corretto scrivere Integer k=3;',
                solution: true
            },
            {
                question: 'L\'esistenza di un metodo f(int x) in una classe e di uno f(String s) in una sua sottoclasse è un esempio di overloading.',
                solution: true
            },
            {
                question: 'In una classe ci può essere un solo metodo main.',
                solution: false
            },
            {
                question: 'Il metodo finalize() chiama automaticamente il corrispondente metodo della superclasse.',
                solution: false
            },
            {
                question: 'Il costruttore chiama automaticamente il costruttore della superclasse con gli stessi parametri. Se nella superclasse non è disponibile un costruttore con parametri dello stesso tipo, ciene chiamato il costruttore vuoto.',
                solution: false
            }
        ]
    ]
};

export default EXAM;
