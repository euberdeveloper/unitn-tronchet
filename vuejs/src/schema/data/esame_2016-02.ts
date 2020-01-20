import { Exam } from '../types/exam.interface';

const EXAM: Exam = {
    name: 'Esame - 02/2016',
    id: 'esame_2016-02',
    exercises: [
        {
            code: `public class E4 {
    int x=4;
    E4(int x) {
        f(x); f();
        System.out.print(x);
    }
    void f() { x++; System.out.print(x);}
    void f(int x) { this.x++; x--; System.out.print(x);}
    public static void main(String arg[]) {
        int x=2;
        new E4(2);
}}`,
            solution: ['162']
        },
        {
            code: `class E3 {
    static int counter=4;
    private int value=2;
    E3(){value=++counter;}
    public String toString(){
        return this.getClass().getName()+value+" ";}
    public void finalize(){System.out.print("F"+value);}
}
public class G extends E3{
    public static void main(String d[]){
        LinkedList<E3> x=new LinkedList<E3>();
        E3 a1=new G();
        G a2 =new G();
        E3 a3=new E3();
        x.add(a1);x.add(a3);
        a1=null; a2=null; a3=null;
        Iterator<E3> it=x.iterator();
        while (it.hasNext()){System.out.print(it.next());}
        System.gc();System.runFinalization();
}}`,
            solution: ['NomePackage.G5 NomePackage.E37 F6']
        },
        {
            code: `import java.util.*;
public class E2 {
    static HashSet hs=new HashSet();
    public int hashCode() {return 0;}
    public boolean equals(Object x) {
        return (x.getClass().equals(this.getClass())); }
    public static void main(String s[]){
        f(new E2()); f(new E2()); f(new A2());
        f(new A2()); f(new A3()); f(new A3());
    }
    static void f(E2 x) {int v=0;
        if (hs.add(x)) v=1; System.out.print(v);
    }
}
class A2 extends E2 {
    public boolean equals(Object x) {
        return x instanceof A2;
    }
}
class A3 extends A2 {}`,
            solution: ['101000']
        },
        {
            code: `class A1 {int x=7; }
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
                cause: 'Assegnamento di Classe Padre a Classe Figlia'
            }
        },
        {
            code: `#include <cstdlib>
#include <iostream>
using namespace std;
void f(char x[2],int index,char value){
    x[index]=value;
}
int main(int argc, char** argv) {
    char a[]="ABCDEFGHIL";
    strcpy(&a[3], "000");
    f(&a[2],4,'$');
    f(&a[2],6,0);
    cout<<a;
    return 0;
}`,
            solution: ['ABC000$H']
        },
        {
            code: `public class C {
    int s=5;
    void f() {System.out.print("A"+(++s));}
    public static void main(String[]a){
        C y=new C();
        C x=new C() {
            void f() {System.out.print("B"+(--s));}
        };
        x.f();
        y.f();
    }
}`,
            solution: ['B4A6']
        },
        {
            code: `public class D {
    static int x=2;
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
        public void finalize() { System.out.print(k); }
    }
    class Pippo2 extends Pippo {
        Pippo2() {k=x++;}
    }
}`,
            solution: [
                'X35',
                'X53',
                '3X5',
                '35X',
                '53X',
                '5X3'
            ]
        },
        {
            code: `import java.util.*;
public class E6 {
    static Collection ll = new LinkedList();
    int x=6;
    E6(){}
    E6(int x){
        ll.add(this);
        ll.add(new EA5());
    }
    public static void main(String z[]) {
        new E6(3);
        Iterator iter = ll.iterator();
        while (iter.hasNext()) {
            ((E6)(iter.next())).f();
    }}
    public void f() { System.out.print(x); }
}
class EA5 extends E6 {
    public void f() {
        x++; super.f(); System.out.print(2);
}}`,
            solution: ['672']
        },
        [
            {
                question: 'Se una classe è astratta è permesso usarla per effettuare ereditarietà multipla.',
                solution: false
            },
            {
                question: 'È corretto scrivere Integer k=3;',
                solution: true
            },
            {
                question: 'L\' esistenza di un metodo f(int x) e di uno f(String s) nella stessa classe è un esempio di overloading.',
                solution: true
            },
            {
                question: 'L\' esistenza di una classe di metodo f(int x), e in una sua sottoclasse di un metodo f(float x) è un esempio di overriding.',
                solution: false
            },
            {
                question: 'Se a.hashCode==b.hashCode, a.equals(b) deve essere vero.',
                solution: false
            },
            {
                question: 'Se a.hashCode!=b.hashCode, a.equals(b) deve essere falso.',
                solution: true
            },
            {
                question: 'Il metodo finalize() chiama automaticamente il corrispondente metodo della superclasse.',
                solution: false
            },
            {
                question: 'Il costruttore chiama automaticamente il costruttore della superclasse con gli stessi parametri. Se nella superclasse non è disponibile un costruttore con parametri dello stesso tipo, viene chiamato il costruttore vuoto.',
                solution: false
            }
        ]
    ]
};

export default EXAM;
