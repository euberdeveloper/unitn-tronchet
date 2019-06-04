import { Exam } from '../types/exam.interface';

const EXAM: Exam = {
    name: 'Esame - 07/2005',
    id: 'esame_2005-07',
    exercises: [
        {
            code: `package uno;
import java.util.*;
public class A{
    A(){
        Collection l = new LinkedList();
        Collection s = new HashSet();
        for (int i = 0; i < 12; i++)
            if (i % 2 == 0)
                l.add(new Integer(i%3));
        s.addAll(l);
        System.out.println(l.size()+" "+s.size());
    }
    public static void main (String args[]){
        new A();
    }
}`,
            solution: ['6 3']
        },
        {
            code: `package uno;
class B extends C {
    void x() {System.out.println("X");}
}
class C {
    void x() {System.out.println("Y");}
}
public class A{
    A() {
    C x=new B();
    x.x();
    }
    public static void main (String args[]){
        new A();
    }
}`,
            solution: ['X']
        },
        {
            code: `package uno;
class B {
    int x=3;
    B(int x) {this.x=x;}
}
public class A {
    void f() {
        try {
            B b1 = new B(5);
            B b2 = (B) b1.clone();
            b2.x++;
            System.out.println(b1.x + " " + b2.x);
        } catch (Exception e) {e.printStackTrace();}
    }
    public static void main(String string[]) {
        A a=new A();
        a.f();
}}`,
            solution: {
                type: 'COMPILETIME',
                row: 10,
                cause: 'Clone è protected in quanto non ne è stato fatto l\'overriding'
            }
        },
        {
            code: `#include <iostream.h>
int x=4;
int f(int * x) {
    x++;
    return (--(*x));
}
void g(int & y) {
    --y;
}
int main(){
    int y[]={3,2,1};
    cout << f(&y[1]);
    g(x);
    cout << x << *y << y[1] << *(y+2);
}`,
            solution: ['03320']
        },
        {
            code: `package uno;
class B {
    int x=4;
    B(int x) {this.x=x;}
}
public class A {
    A() {
        B b1=new B(3);
        B b2=new B(3);
        System.out.println(b1.equals(b2));
    }
    public static void main(String Args[]) {
        new A();
    }
}`,
            solution: ['false']
        },
        {
            code: `package uno;
public class A{
    static int f(int x) {x++; return x-1;}
    private int g(int x) {x--; return x+1;}
    public static void main(String STring[]) {
        int z=3;
        System.out.println(f(z));
        System.out.println(g(z));
    }
}`,
            solution: {
                type: 'COMPILETIME',
                row: 4,
                cause: 'I metodi statici non possono chiamare metodi di istanza'
            }
        },
        {
            code: `package uno;
public class A {
    C c=null;
    public A() {
        System.out.print("+10");
        C c1=new C();
        c=new C();
    }
    public static void main(String[] args) {
        A a = new A();
        System.gc();
        new C();
        a = null;
        System.gc();
    }
}
class C {
    static int count=0;
    String name=null;
    public C() {
        name="2"+(++count);
        System.out.print("+"+name);
    }
    protected void finalize() {
        stem.out.print("-"+name);
    }
}`,
            solution: [
                '+10+21+22-21+23-22-23',
                '+10+21+22-21+23-23-22',
                '+10+21+22+23-21-22-23',
                '+10+21+22+23-21-23-22',
                '+10+21+22+23-22-21-23',
                '+10+21+22+23-22-23-21',
                '+10+21+22+23-23-21-22',
                '+10+21+22+23-23-22-21'
            ]
        },
        [
            {
                question: 'Se A è padre di B la scrittura A a=new B(); genera errore a runtime',
                solution: false
            },
            {
                question: 'Se A è padre di B la scrittura B a=new A(); genera errore a runtime',
                solution: false
            },
            {
                question: 'Se A è padre di B la scrittura B a=new A(); genera errore a compile time',
                solution: true
            },
            {
                question: 'Se A è padre di B la scrittura A a=new B(); genera errore a compile time',
                solution: false
            },
            {
                question: 'Se A è padre di B la scrittura A a=(A)(new B()); genera errore a runtime',
                solution: false
            },
            {
                question: 'Se A è padre di B la scrittura B a=(B)(new A()); genera errore a compile time',
                solution: false
            },
            {
                question: 'JButton ha il metodo equals()',
                solution: true
            },
            {
                question: 'JButton ha il metodo clone()',
                solution: true
            },
            {
                question: 'new JButton().clone(); genera errore a compile time anche se i package necessari sono inclusi',
                solution: true
            },
            {
                question: 'new JButton().clone(); genera errore a runtime',
                solution: false
            }
        ],
    ]
};

export default EXAM;
