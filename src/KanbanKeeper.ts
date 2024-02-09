// KanbanKeeper.ts
interface List {
  title: string;
  cards: Card[];
}

interface Card {
  text: string;
}
const DEFAULT_LIST: List[] = [
  { title: 'To Do', cards: [{ text: 'Task 1' }, { text: 'Task 2' }] },
  { title: 'In Progress', cards: [{ text: 'Task 3' }, { text: 'Task 4' }] },
  { title: 'Done', cards: [{ text: 'Task 5' }, { text: 'Task 6' }] }
];
const KanbanKeeper = {
  saveLists(lists: List[]): void {
    localStorage.setItem('kanbankeeper', JSON.stringify(lists));
  },

  getLists(): List[] {
    const listsJSON = localStorage.getItem('kanbankeeper');
    return listsJSON ? JSON.parse(listsJSON) : DEFAULT_LIST;
  }
};

export default KanbanKeeper;
