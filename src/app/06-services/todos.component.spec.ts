import { TodosComponent } from './todos.component';
import { TodoService } from './todo.service';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let service: TodoService;

  beforeEach(() => {
    service = new TodoService(null);
    component = new TodosComponent(service);
  });

  it('should set todo property with then items returned from the server', () => {
    let todos = [1, 2, 3];

    spyOn(service, 'getTodos').and.callFake(() => {
      return Observable.from([todos]);
    });

    component.ngOnInit();

    // Genérico
    expect(component.todos.length).toBeGreaterThan(0);
    // Específico
    expect(component.todos).toBe(todos);
  });

  it('should call the server to add new item', () => {
    let spy = spyOn(service, 'add').and.callFake(t => {
      return Observable.empty();
    });

    component.add();

    expect(spy).toHaveBeenCalled();
  });

  it('should add the new todo returned from the server', () => {
    let todo = { id: 1 }
    // Forma Antiga
    /*
    let spy = spyOn(service, 'add').and.callFake(t => {
      return Observable.from([todo]);
    });
    */
    // Nova Forma
    let spy = spyOn(service, 'add').and.returnValue(Observable.from([todo]));

    component.add();

    expect(component.todos.indexOf(todo)).toBeGreaterThan(-1);
  });

  it('should set the message property if server returned an error', () => {
    let error = 'Error from the service'
    // Nova Forma
    let spy = spyOn(service, 'add').and.returnValue(Observable.throw(error));

    component.add();

    expect(component.message).toBe(error);
  });

  it('should call the server to delete item if the user confirms', () => {
    
    spyOn(window, 'confirm').and.returnValue(true);
    let spy = spyOn(service, 'delete').and.returnValue(Observable.empty());

    component.delete(1);

    // Genérico
    expect(spy).toHaveBeenCalled();
    // Específico
    expect(spy).toHaveBeenCalledWith(1);
  });
  
  it('should NOT call the server to delete item if the user cancels', () => {
    
    spyOn(window, 'confirm').and.returnValue(false);
    let spy = spyOn(service, 'delete').and.returnValue(Observable.empty());

    component.delete(1);

    expect(spy).not.toHaveBeenCalled();
    
  });


});