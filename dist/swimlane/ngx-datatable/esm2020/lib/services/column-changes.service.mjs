import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from '@angular/core';
/**
 * service to make DatatableComponent aware of changes to
 * input bindings of DataTableColumnDirective
 */
export class ColumnChangesService {
  constructor() {
    this.columnInputChanges = new Subject();
  }
  get columnInputChanges$() {
    return this.columnInputChanges.asObservable();
  }
  onInputChange() {
    this.columnInputChanges.next();
  }
}
ColumnChangesService.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '13.1.1',
  ngImport: i0,
  type: ColumnChangesService,
  deps: [],
  target: i0.ɵɵFactoryTarget.Injectable
});
ColumnChangesService.ɵprov = i0.ɵɵngDeclareInjectable({
  minVersion: '12.0.0',
  version: '13.1.1',
  ngImport: i0,
  type: ColumnChangesService
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '13.1.1',
  ngImport: i0,
  type: ColumnChangesService,
  decorators: [
    {
      type: Injectable
    }
  ]
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLWNoYW5nZXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N3aW1sYW5lL25neC1kYXRhdGFibGUvc3JjL2xpYi9zZXJ2aWNlcy9jb2x1bW4tY2hhbmdlcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQzs7QUFFM0M7OztHQUdHO0FBRUgsTUFBTSxPQUFPLG9CQUFvQjtJQURqQztRQUVVLHVCQUFrQixHQUFHLElBQUksT0FBTyxFQUFhLENBQUM7S0FTdkQ7SUFQQyxJQUFJLG1CQUFtQjtRQUNyQixPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNoRCxDQUFDO0lBRUQsYUFBYTtRQUNYLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNqQyxDQUFDOztpSEFUVSxvQkFBb0I7cUhBQXBCLG9CQUFvQjsyRkFBcEIsb0JBQW9CO2tCQURoQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbi8qKlxuICogc2VydmljZSB0byBtYWtlIERhdGF0YWJsZUNvbXBvbmVudCBhd2FyZSBvZiBjaGFuZ2VzIHRvXG4gKiBpbnB1dCBiaW5kaW5ncyBvZiBEYXRhVGFibGVDb2x1bW5EaXJlY3RpdmVcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvbHVtbkNoYW5nZXNTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBjb2x1bW5JbnB1dENoYW5nZXMgPSBuZXcgU3ViamVjdDx1bmRlZmluZWQ+KCk7XG5cbiAgZ2V0IGNvbHVtbklucHV0Q2hhbmdlcyQoKTogT2JzZXJ2YWJsZTx1bmRlZmluZWQ+IHtcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5JbnB1dENoYW5nZXMuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBvbklucHV0Q2hhbmdlKCk6IHZvaWQge1xuICAgIHRoaXMuY29sdW1uSW5wdXRDaGFuZ2VzLm5leHQoKTtcbiAgfVxufVxuIl19
