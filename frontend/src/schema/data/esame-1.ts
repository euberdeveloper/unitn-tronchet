import { Exam } from '../types/exam.interface';

const EXAM: Exam = {
    name: 'Esame 1',
    id: 'esame-1',
    exercises: [
        {
            code: `class DemoAssert {
    int x=5;
    public void stampaInteroPositivo(int i) {
        assert i >= 0 : stampaErroreAssert();
        System.out.println(i);
    }
    public int stampaErroreAssert() {
        System.out.println("XX");
        return -1;
    }
    public static void main(String args[]) {
        int x=-10;
        DemoAssert test = new DemoAssert();
        test.stampaInteroPositivo(x);
    }
}`,
            solution: {
                type: 'RUNTIME',
                row: 4,
                cause: 'x = -10, quindi l\'assert lancia un errore'
            }
        },
        {
            code: `class DemoAssert {
    int x=5;
    public void stampaInteroPositivo(int i) {
        assert i >= 0 : stampaErroreAssert();
        System.out.println(i);
    }
    public int stampaErroreAssert() {
        System.out.println("XX");
        return -1;
    }
    public static void main(String args[]) {
        x=10;
        DemoAssert test = new DemoAssert();
        test.stampaInteroPositivo(x);
    }
}`,
            solution: {
                type: 'COMPILETIME',
                row: 11,
                cause: 'Le variabili d\'istanza non possono essere usate da metodi statici'
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
                cause: 'x ha visibilità package e non può essere vista nel package abcd.'
            }
        },
        {
            code: `#include <iostream.h>
void rimescola(int& k, int m, int* n) {
    k = m; m = *n; *n = k; n[-1] = k;
}
int main(){
    int vet[] = {5,4,3,2,1};
    rimescola(vet[0],vet[2],vet+4);
    for (int i=0;i<5;i++) cout<<vet[i];
    return 0;
}`,
            solution: ['34333']
        },
        {
            code: `package uno;
public class A {
    void f(int k) {
        stem.out.print(k*3);
    }
    public static void main (String args[]){
        Object z=null;
        try {
            z = Class.forName("uno.B").newInstance();
        } catch (Exception ex) { ex.printStackTrace();}
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
            code: `public class A {
    public A() {System.out.print("1");}
    public void finalize(){System.out.print("3");}
    public static void main(String Args[]){
        A x;
        A z=new A();
        A y=z;
        z=null;
        System.gc();
        System.out.print("5");
        y=null;
        System.gc();
    }
}`,
            solution: ['153']
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
        [
            {
                question: 'Container eredita da Component',
                solution: true
            },
            {
                question: 'Component è figlia di Container',
                solution: false
            },
            {
                question: 'JComponent è figlia di Component',
                solution: false
            }
        ],
        [
            {
                question: 'Java non usa lo stack ma solo la heap',
                solution: false
            },
            {
                question: 'Java usa lo stack solo per le variabili statiche',
                solution: false
            },
            {
                question: 'Java non usa la heap ma solo lo stack',
                solution: false
            }
        ],
        [
            {
                question: 'Quando si scrive la clone si deve anche scrivere anche la equals',
                solution: false
            },
            {
                question: 'Quando si scrive la equals si deve anche scrivere anche la clone',
                solution: false
            },
            {
                question: 'Per le classi che non hanno una struttura profonda non serve scrivere la equals',
                solution: false
            }
        ],
    ]
};


export default EXAM;
