import { SampleStudyMaterial } from '../types';

export const SAMPLE_MATERIALS: SampleStudyMaterial[] = [
  {
    id: 'networking',
    category: 'Computer Science',
    topic: 'OSI Model and TCP/IP Protocols',
    difficulty: 'intermediate',
    material: `The Open Systems Interconnection (OSI) model describes seven layers that computer systems use to communicate over a network:
1. Physical Layer: Transmits raw bits over a physical medium (cables, radio frequencies). Equipment: hubs, repeaters, network cables.
2. Data Link Layer: Node-to-node data transfer, framing, MAC addressing, and error detection (CRC). Equipment: switches, bridges. Protocol examples: Ethernet (802.3), Wi-Fi (802.11).
3. Network Layer: Responsible for packet forwarding, routing, and logical IP addressing across different networks. Protocols: IPv4, IPv6, ICMP. Equipment: routers.
4. Transport Layer: End-to-end communication, reliability, segmentation, and flow control. Key protocols: TCP (Transmission Control Protocol - connection-oriented, reliable with 3-way handshake SYN, SYN-ACK, ACK) and UDP (User Datagram Protocol - connectionless, faster, no retransmission).
5. Session Layer: Manages sessions, dialog control, and synchronization between applications.
6. Presentation Layer: Formats, translates, compresses, and encrypts data (e.g., SSL/TLS, ASCII, JPEG).
7. Application Layer: End-user interface and network services. Protocols: HTTP, HTTPS, DNS, SMTP, FTP, SSH.

TCP uses port numbers: HTTP (80), HTTPS (443), DNS (53), SSH (22). DNS converts human-readable domain names into IP addresses.`
  },
  {
    id: 'oop',
    category: 'Software Engineering',
    topic: 'Object-Oriented Programming (OOP) Principles',
    difficulty: 'intermediate',
    material: `Object-Oriented Programming (OOP) is a programming paradigm based on the concept of 'objects' containing data (fields/attributes) and code (methods/functions).
The 4 Fundamental Pillars of OOP are:
1. Encapsulation: Bundling data and methods that operate on that data within a single unit (class), and restricting direct access to some components using access specifiers (private, protected, public) to prevent unauthorized alteration. Getters and setters provide controlled access.
2. Abstraction: Hiding internal complex implementation details and showing only essential features to the user. Achieved through abstract classes and interfaces.
3. Inheritance: The mechanism where a new child (derived/subclass) class acquires properties and behaviors from an existing parent (base/superclass) class, promoting code reusability. Types include single, multilevel, and multiple inheritance (via interfaces in Java/C#).
4. Polymorphism: The ability of a message or function to be displayed in more than one form.
- Compile-time polymorphism (Static): Method Overloading (same method name, different parameters in the same class).
- Runtime polymorphism (Dynamic): Method Overriding (subclass provides specific implementation of a method already defined in superclass) using virtual functions.`
  },
  {
    id: 'biology',
    category: 'Natural Science',
    topic: 'Photosynthesis & Cellular Energy',
    difficulty: 'beginner',
    material: `Photosynthesis is the biological process by which autotrophic organisms (plants, algae, cyanobacteria) convert light energy into chemical energy stored in glucose.
General Equation: 6CO2 + 6H2O + Light Energy -> C6H12O6 (glucose) + 6O2 (oxygen).
Occurs inside chloroplasts in plant cells.
Two main stages:
1. Light-Dependent Reactions:
- Occur in the thylakoid membranes.
- Chlorophyll pigment absorbs light energy.
- Water (H2O) molecules are photolyzed (split), releasing oxygen (O2) gas as a byproduct, protons (H+), and electrons.
- Produces ATP and NADPH (energy carrier molecules).
2. Light-Independent Reactions (The Calvin Cycle):
- Occur in the stroma of the chloroplast.
- Uses ATP and NADPH produced in the light stage along with CO2 to synthesize glucose.
- Catalyzed by the enzyme RuBisCO (Ribulose-1,5-bisphosphate carboxylase-oxygenase).

Stomata are microscopic pores on leaves regulated by guard cells that control gas exchange (CO2 intake, O2 and water vapor release).`
  },
  {
    id: 'dbms',
    category: 'Database Systems',
    topic: 'Relational Database Normalization',
    difficulty: 'advanced',
    material: `Database Normalization is the process of structuring a relational database in accordance with normal forms to reduce data redundancy and eliminate update, insertion, and deletion anomalies.
Key Normal Forms:
1. First Normal Form (1NF):
- Each column must contain atomic (indivisible) values.
- No repeating groups or arrays in columns.
- Each record must have a unique identifier (Primary Key).
2. Second Normal Form (2NF):
- Must be in 1NF.
- Eliminates Partial Dependency: Every non-prime attribute must depend on the whole candidate key, not a subset (only applies when composite primary keys exist).
3. Third Normal Form (3NF):
- Must be in 2NF.
- Eliminates Transitive Dependency: No non-prime attribute should depend on another non-prime attribute (X -> Y where Y is non-prime and X is not a superkey).
4. Boyce-Codd Normal Form (BCNF):
- A stricter version of 3NF.
- For every functional dependency X -> Y, X must be a superkey.
Benefits of Normalization: Data integrity, storage efficiency, predictable queries. Tradeoff: Increases number of joins in analytical queries.`
  }
];
