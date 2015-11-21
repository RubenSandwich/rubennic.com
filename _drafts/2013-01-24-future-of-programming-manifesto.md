---
layout: post
title: Future of Programming Manifesto
---

The name Manifesto is specificlly choosen here. Because I think of Manifesto for 


I should start out this Ma
I don't think C or Assembly or Object Oriented Programming is going away anytime soon.

##Human Minded  
Programming is not optimized for humans but for machines. Humans struggle with giving precise detailed logical steps, yet this is the default model for programming. We need to force ourselves to think like a machine, not like a human to solve problems. We need to get into the state of ‘flow’ which in reality is a reduced brain state where only black and white exist. Humans do think logically but their logic skips around, sometimes starting at the end and working backwards. Sometimes going forward towards a goal and is often not fine grained. We should tell the computer what to do and it should figure out the best way to do it. At the end of the day I don’t care if I use a for loop or a map, I want to solve the problem. Leave the optimization details to the computer, they are better at it then we are. (For most people.) 

*See SQL, Databases and Prolog.*

##Observable Changes
I liken programming to trying to paint while blindfolded, and only removing the blindfold to check your work. I don’t want to stop my concentration and wait 10 seconds to check my work. Human concentration is a very fragile thing, maybe even more so with modern societies war for our attention. I should be able to pause my program, rewind the last action, change something and see the effects of that change all within a short ammount of time.  

*See Live Reload, Hot Code swapping, Software Transactional Memory.*

##Stable Foundation
We build our cathedrals on shifting sand. API’s change, methods get deprecated and hyperlinks disappear into the ether. I need to know if updating will break something for me. In short bit rot happens and our programs tend to have a half life of less then two years if we are lucky. We should congratulate ourselves that we have built something so incrediablity unstable. I remember talking to a client and mentioning the need for maintenance for a project and him looking at me like I was selling him snake oil insurance. Nature laughs at our ‘cathedrals’. Nature in fact should be our goal, we should aim for resilient self correcting systems. We should not have to stop the world to update. 

*See Semantic Versioning, NixOS, Erlang BEAM, Docker.*

##Simple Pieces
The human mind can keep around five to sevens items in short term memory. Yet when debugging we are supposed to remember the current state of our program, what lead to this state and what other objects we are interacting with. It is too much. We need a simpler model where I can only worry about one thing, that takes input and spits out output. The same input should always be the same output, because if not then we then run into the same problem of too many things we have to keep track of. 

*See Functional Programming, Actor Model.*

##Reusable Pieces
I recently created something. It is like a polygon but with so many sides that it indistinguishable were one side starts and were one ends. I call it a semi-round polygon. I’m also tinkering with magnifying the sun onto dried straw, I really think it’s going places. Every new paradigm in programming has promised more code reuse. But let’s look at were we currently use: a  Object Oriented MVC architecture. Can we reuse the Model? Not really as that tends to be business logic related to the problem domain. Can we reuse the Controller? Maybe parts of it, but it tends to be tightly coupled to the views it communicates with. Really the only part of MVC that can be easily reused is the View. This is terrible. I’m constantly reinventing a worse and less safe wheel. We need to have components that are some combination of a View and Controller that are easily composable and testable. 

*See Web components, React, Immediate Form UI.*
  
##Multiple Representations
Programming is currently textual based. This makes finding the structure of a program and it's control flow hidden behind keywords and files. We should be able to see our program as a graph with all branches easily viewable and changable. We shouldn't be forced into blindly manipulate symbols to see an effect, we should be able to have edit code and see a changed result and edit results and see changed code.

*See Dataflow Graphs, Spreadsheets*

Let's not object to ideas because they are not object orientaited or don't have curly braces. These issuie's are childish to fight over, lets object to ideas because they do not scale well or are too complex for it's own good.

The beauty of computers is that we are the master of the universe we have created and what a screwed up universe it is. I don’t think of God as a programing the universe, because if he did it would of run into a null pointer exception long before now. We need better tools, not better schooling or more intense interviews. We are stupid small minded apes, our tools should compensate for that fact. We can and have to do better. We can’t build our economical, healthcare and other critical systems in such an unstable environment and not expect future catastrophic failure.

Do I think I will succeed in these efforts? No of course not. I would be crazy to think that I would when others much better/smarter/(pick your adjective) then me have tried. But I need to try, we all need to try. Stop accepting the status quo of programming, we can and have to do better. 

This is my declaration to try.

How can you try?

Learn a new [programming paradigm](https://en.wikipedia.org/wiki/Programming_paradigm):  
> When I'm evulating a new paradigm I usually build two simple components to have a baseline to compare it to other paradigms:  
> 1. A button that when pressed updates it's title with the total number of times it was pressed.  
> 2. A pair of inputs that function as a password validator that should report errors in this order:  
>   1. The password should have an aribarty length  
>   2. Both passwords should match  

* Logic Programming  
* Functional Programming  
* Etc

1. A button that when pressed updates it's title with the total number of times it was pressed.  
2. A pair of inputs that function as a password validator that should report errors in this order:  
 * The password should have an aribarty length  
 * Both passwords should match  

Contribute to projects doing interesting things with programming languages:  
* Rust  
* Eve  
* Unison  
* Elm  
* Etc  

This manifesto is heavily inspired by these talks and blog posts;  
bret victor future of programming  
http://pchiusano.github.io/2013-05-22/future-of-software.html  
http://www.chris-granger.com/2014/03/27/toward-a-better-programming/  
https://www.cs.utexas.edu/users/EWD/transcriptions/EWD00xx/EWD32.html  

