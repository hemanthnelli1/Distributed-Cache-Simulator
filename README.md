# Distributed Cache Simulator

An advanced full-stack distributed caching system simulator implementing:

* LRU (Least Recently Used) eviction
* Distributed node architecture
* Hash-based routing
* Real-time cache metrics
* Interactive React dashboard
* FastAPI backend APIs



# Preview

This project simulates how distributed cache systems work internally using:

* independent cache nodes
* deterministic key routing
* node-wise eviction
* O(1) cache operations

Inspired by real-world systems like:

* Redis
* Memcached
* Distributed in-memory caching engines

---

# Tech Stack

## Frontend

* React
* Vite
* JavaScript
* Modern CSS

## Backend

* Python
* FastAPI

## Core DSA Concepts

* HashMap
* Doubly Linked List
* LRU Cache
* Hash Routing
* Distributed Partitioning

---

# Features

## Distributed Cache Nodes

Keys are distributed across multiple cache nodes using a custom hash routing algorithm.

---

## LRU Eviction

When a node reaches capacity:

* least recently used item gets removed
* insertion remains O(1)
* retrieval remains O(1)

---

## Real-Time Dashboard

Interactive frontend dashboard displaying:

* active nodes
* live cache contents
* request metrics
* hit/miss tracking
* eviction count

---

## Cache Operations

Supported operations:

* PUT
* GET
* DELETE
* CLEAR ALL

---

# Architecture

Frontend (React)
↓
FastAPI APIs
↓
Distributed Cache Manager
↓
Hash Router
↓
Cache Nodes
↓
LRU Cache Engine

---

# Project Structure

```bash
Distributed-Cache-Simulator/
│
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── src/
│       ├── distributed_cache.py
│       ├── cache_node.py
│       ├── lru_cache.py
│       ├── doubly_linked_list.py
│       ├── hash_router.py
│       ├── metrics.py
│       └── main.py
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# How Routing Works

Each key is routed using:

```python
ASCII_SUM(key) % total_nodes
```

Example:

| Key | ASCII | Node   |
| --- | ----- | ------ |
| A   | 65    | Node 2 |
| B   | 66    | Node 0 |
| C   | 67    | Node 1 |

---

# Example Flow

Suppose:

```python
capacity_per_node = 2
```

If Node 2 contains:

```text
A
D
```

and new key:

```text
G
```

routes to Node 2,
then:

```text
A gets evicted
```

because it is the least recently used item.

---

# API Endpoints

## Insert Data

```http
POST /put?key=A&value=100
```

---

## Get Data

```http
GET /get/A
```

---

## Delete Data

```http
DELETE /delete/A
```

---

## Metrics

```http
GET /metrics
```

---

## Cache State

```http
GET /cache-state
```

---

## Clear Cache

```http
DELETE /clear
```

---

# Installation

## Backend Setup

```bash
cd backend
pip install -r requirements.txt
uvicorn app:app --reload
```

Backend runs on:

```text
http://127.0.0.1:8000
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# Learning Outcomes

This project demonstrates understanding of:

* distributed systems
* backend engineering
* cache design
* LRU algorithms
* DSA implementation
* frontend/backend integration
* REST APIs
* system design fundamentals

---

# Future Improvements

Possible upgrades:

* Consistent hashing
* Redis integration
* WebSocket live updates
* Docker deployment
* Authentication
* Cloud deployment
* Node scaling simulation
* Request latency visualization

---

# Author

Hemanth Nelli

GitHub:
[https://github.com/hemanthnelli1](https://github.com/hemanthnelli1)
