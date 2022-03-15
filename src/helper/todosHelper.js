export const isNotCheckedAll = (todos = []) => todos.find(todo => !todo.isCompleted)

export const filterByStatus = (listTodos = [], status = '') => {
    switch (status) {
      case 'ACTIVE':
        return listTodos.filter(item => !item.isCompleted)
      case 'COMPLETED':
        return listTodos.filter(item => item.isCompleted)
      default:
        return listTodos
    }
  }