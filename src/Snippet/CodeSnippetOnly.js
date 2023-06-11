/** @format */

export const JavaSnipCode = `
import java.util.*;  
class Main  
{  
public static void main(String[] args)  
  {  
   System.out.println("Hello World");
  }  
}  `;

export const JSSnipcode = `
/**
* Problem: Binary Search: Search a sorted array for a target value.
*/

// Time: O(log n)
const binarySearch = (arr, target) => {
 return binarySearchHelper(arr, target, 0, arr.length - 1);
};

const binarySearchHelper = (arr, target, start, end) => {
 if (start > end) {
   return false;
 }
 let mid = Math.floor((start + end) / 2);
 if (arr[mid] === target) {
   return mid;
 }
 if (arr[mid] < target) {
   return binarySearchHelper(arr, target, mid + 1, end);
 }
 if (arr[mid] > target) {
   return binarySearchHelper(arr, target, start, mid - 1);
 }
};

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const target = 5;
console.log(binarySearch(arr, target));  `;

export const PythonSnipCode = `
# Python program to print all
# prime number in an interval
# number should be greater than 1
start = 11
end = 25
for val in range(start, end + 1):

    # If num is divisible by any number
    # between 2 and val, it is not prime
    if val > 1:
    for n in range(2, val):
        if (val % n) == 0:
        break
    else:
        print(val)  `;
//
export const CppSnipCode = `
#include <iostream>
using namespace std;
int main()
{
    cout << "Hello World";
    return 0;
}  `;
export const CSharpSnipCode = `
using System;
namespace HelloWorld
{
    class Hello {         
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");
        }
    }
}  `;
export const GoSnipCode = `
package main
import "fmt"
func main() {
    fmt.Println("Hello, World!")
}  `;
export const CSnipCode = `
#include <stdio.h>
int main()
{
    printf("Hello World");
    return 0;
    }  `;
export const AssemblySnipCode = `
    global _start
    section .text
    _start:
    mov eax, 4
    mov ebx, 1
    mov ecx, msg
    mov edx, msg.len
    int 0x80
    mov eax, 1
    mov ebx, 0
    int 0x80

    section .data
    msg db 'Hello, World!', 0xa
    msg.len equ $ - msg  `;
export const SwiftSnipCode = `
    import Foundation
    print("Hello, World!")  `;
export const RubySnipCode = `
    puts "Hello, World!"  `;
export const PHPsnipCode = `
    <?php
    echo "Hello, World!";
    ?>  `;
export const PerlSnipCode = `
    print "Hello, World!";  `;
export const ObjectiveCSnipCode = `

    #import <Foundation/Foundation.h>
    int main (int argc, const char * argv[])
    {
    NSAutoreleasePool * pool = [[NSAutoreleasePool alloc] init];
    NSLog (@"Hello, World!");
    [pool drain];
    return 0;
    }  `;
export const KotlinSnipCode = `
    fun main() {
    println("Hello, World!")
    }  `;
export const HaskellSnipCode = `

    main = putStrLn "Hello, World!"  `;

export const RustSnipCode = `
    fn main() {
    println!("Hello, World!");
    }  `;
export const DartSnipCode = `
    void main() {
    print('Hello, World!');
    }  `;
export const ScalaSnipCode = `
    object HelloWorld {
    def main(args: Array[String]) {
    println("Hello, world!")
    }
    }  `;
export const ElixirSnipCode = `
    IO.puts "Hello, world!"  `;
export const ClojureSnipCode = `
    (println "Hello, World!")  `;
export const LuaSnipCode = `
    print("Hello, World!")  `;
export const JuliaSnipCode = `
    println("Hello, World!")  `;
export const RSnipCode = `
    print("Hello, World!")  `;
export const FSnipCode = `
    printfn "Hello, World!"  `;
export const VBSnipCode = `

    Sub Main()
    Console.WriteLine("Hello, World!")
    End Sub  `;
export const TypeScriptSnipCode = `
    console.log("Hello, World!");  `;
export const CPlusPlusSnipCode = `
    #include <iostream>
    using namespace std;
    int main()
    {
    cout << "Hello World";
    return 0;
    }  `;

export const fsharpSnipCode = `
    printfn "Hello, World!"  `;
export const VBNetSnipCode = `
    Imports System
    Module Module1
    Sub Main()
    Console.WriteLine("Hello, World!")
    End Sub
    End Module  `;
export const BashSnipCode = `
    echo "Hello, World!"  `;
export const BasicSnipCode = `
    10 PRINT "Hello, World!"
    20 GOTO 10  `;
export const CobolSnipCode = `
    IDENTIFICATION DIVISION.
    PROGRAM-ID. HELLO-WORLD.
    PROCEDURE DIVISION.
    DISPLAY "Hello, World!".
    STOP RUN.  `;
export const CommonLispSnipCode = `
    (format t "Hello, World!")  `;
    