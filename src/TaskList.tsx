import { useMutation, useQuery } from '@apollo/client/react';
import { GET_TASKS } from './graphql/queries';
import { COMPLETE_TASK } from './graphql/mutations';

function TaskList() {
    const { loading, error, data } = useQuery(GET_TASKS);
    const [completeTask] = useMutation(COMPLETE_TASK);

    async function handleComplete(id: number) {
        try {
            await completeTask({
                variables: { id }
            });
        } catch (err) {
            console.error("Ошибка при выполнении мутации:", err);
        }
    }

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка: {error.message}</p>;

    return (
        <div className='tasks'>
            {data?.allTasks.map(item => <div className='task'>
                <p>{item.title}</p>
                <p>{item.description}</p>
                <p style={{color: item.category.color}}>{item.category.name}</p>
                <p style={{color: item.isCompleted ? "green" : "red"}}>{item.isCompleted ? "Выполнено" : "Не выполнено"}</p>
                {item.isCompleted ? "" : <button onClick={() => handleComplete(item.id)}>Выполнить задачу</button>}
            </div>)}
        </div>
    )
}

export default TaskList