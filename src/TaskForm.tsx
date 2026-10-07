import { useMutation } from '@apollo/client/react';
import { useState } from 'react';
import { CREATE_TASK } from './graphql/mutations';

function TaskForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [createTask] = useMutation(CREATE_TASK);

    async function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault();
        if (!title.trim()) return;

        try {
        await createTask({
            variables: { title, description }
        });
      
        setTitle('');
        setDescription('');
        } catch (err) {
            console.error("Ошибка при выполнении мутации:", err);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Название задачи" value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
            <input type="text" placeholder="Описание" value={description} onChange={(e) => setDescription(e.currentTarget.value)}/>
            <button>Добавить задачу</button>
        </form>
    )
}

export default TaskForm
