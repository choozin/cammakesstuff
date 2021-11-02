import { v4 as uuid } from 'uuid'

const todosArray = () => {
    return [
        {
            label: 'Ground Beef',
            description: 'Lean preferably',
            category: 'Deli/Butcher',
            priority: true,
            id: uuid(),
        },
        {
            label: 'Eggs',
            description: '',
            category: 'Dairy',
            priority: false,
            id: uuid(),
        },
        {
            label: 'White Onion',
            description: '',
            category: 'Produce',
            priority: false,
            id: uuid(),
        },
        {
            label: 'Mini Hamburger Buns',
            description: '',
            category: 'Pantry',
            priority: true,
            id: uuid(),
        },
        {
            label: 'Swiss Cheese',
            description: '',
            category: 'Dairy',
            priority: true,
            id: uuid(),
        },
        {
            label: 'Mushrooms',
            description: 'The regular white ones or shittake',
            category: 'Produce',
            priority: true,
            id: uuid(),
        },
        {
            label: 'Tomatoes',
            description: 'Not hot-house, preferably',
            category: 'Produce',
            priority: true,
            id: uuid(),
        },
        {
            label: 'Mayonnaise',
            description: 'Low fat is fine.',
            category: 'Pantry',
            priority: true,
            id: uuid(),
        },
        {
            label: 'Garlic',
            description: 'Can use garlic powder too.',
            category: 'Produce',
            priority: false,
            id: uuid(),
        },
    ];
}

export default todosArray;