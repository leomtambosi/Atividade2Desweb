const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let items = [
    { id: 1, name: "Engenharia de Software"},
    { id: 2, name: "Sistemas de Informação"},
];


app.get('/item', (req, res) => {
    res.status(200).json(items);
});

// Atividade 1 //

app.post('/item', (req, res) => {
    const { name } = req.body;
    if (!name || typeof name !== 'string' || name.length < 3) {
        return res.status(400).json({
            error: 'Erro',
            message: 'O nome deve ter pelo menos 3 letras'
        });
    }
    const newItem = { id: items.length + 1, name };
    items.push(newItem)
    res.status(201).json(newItem);
});

// Atividade 5 //

app.get('/item/count', (req, res) => {
    const count = items.length;
    res.json({ count }); 
});

// Atividade 2 //

app.get('/item/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const item = items.find(item => item.id === id);
    
    if (item) {
        return res.status(200).json(item);
    } else {
        return res.status(404).json({ message: 'Item não encontrado' });
    }
});

// Atividade 3 //

app.patch('/item/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;

    if (typeof name !== 'string') {
        return res.status(400).json({ message: 'O campo name deve ser uma string' });
    }

    const item = items.find(item => item.id == id);
    
    if (item) {
        item.name = name;
        return res.status(200).json(item);
    } else {
        return res.status(404).json({ message: 'Item não encontrado' });
    }
});

// Atividade 4 //

app.delete('/item', (req, res) => {
    items = [];
    res.status(200).json({message: "Tudo foi removido"})
})

app.listen(port, () => {
    console.log(`O servidor está rodando em http://localhost:${port}`);
})