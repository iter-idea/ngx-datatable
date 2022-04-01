import { getterForProp } from './column-prop-getters';
export function optionalGetterForProp(prop) {
  return prop && (row => getterForProp(prop)(row, prop));
}
/**
 * This functions rearrange items by their parents
 * Also sets the level value to each of the items
 *
 * Note: Expecting each item has a property called parentId
 * Note: This algorithm will fail if a list has two or more items with same ID
 * NOTE: This algorithm will fail if there is a deadlock of relationship
 *
 * For example,
 *
 * Input
 *
 * id -> parent
 * 1  -> 0
 * 2  -> 0
 * 3  -> 1
 * 4  -> 1
 * 5  -> 2
 * 7  -> 8
 * 6  -> 3
 *
 *
 * Output
 * id -> level
 * 1      -> 0
 * --3    -> 1
 * ----6  -> 2
 * --4    -> 1
 * 2      -> 0
 * --5    -> 1
 * 7     -> 8
 *
 *
 * @param rows
 *
 */
export function groupRowsByParents(rows, from, to) {
  if (from && to) {
    const nodeById = {};
    const l = rows.length;
    let node = null;
    nodeById[0] = new TreeNode(); // that's the root node
    const uniqIDs = rows.reduce((arr, item) => {
      const toValue = to(item);
      if (arr.indexOf(toValue) === -1) {
        arr.push(toValue);
      }
      return arr;
    }, []);
    for (let i = 0; i < l; i++) {
      // make TreeNode objects for each item
      nodeById[to(rows[i])] = new TreeNode(rows[i]);
    }
    for (let i = 0; i < l; i++) {
      // link all TreeNode objects
      node = nodeById[to(rows[i])];
      let parent = 0;
      const fromValue = from(node.row);
      if (!!fromValue && uniqIDs.indexOf(fromValue) > -1) {
        parent = fromValue;
      }
      node.parent = nodeById[parent];
      node.row['level'] = node.parent.row['level'] + 1;
      node.parent.children.push(node);
    }
    let resolvedRows = [];
    nodeById[0].flatten(function () {
      resolvedRows = [...resolvedRows, this.row];
    }, true);
    return resolvedRows;
  } else {
    return rows;
  }
}
class TreeNode {
  constructor(row = null) {
    if (!row) {
      row = {
        level: -1,
        treeStatus: 'expanded'
      };
    }
    this.row = row;
    this.parent = null;
    this.children = [];
  }
  flatten(f, recursive) {
    if (this.row['treeStatus'] === 'expanded') {
      for (let i = 0, l = this.children.length; i < l; i++) {
        const child = this.children[i];
        f.apply(child, Array.prototype.slice.call(arguments, 2));
        if (recursive) child.flatten.apply(child, arguments);
      }
    }
  }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N3aW1sYW5lL25neC1kYXRhdGFibGUvc3JjL2xpYi91dGlscy90cmVlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUl0RCxNQUFNLFVBQVUscUJBQXFCLENBQUMsSUFBcUI7SUFDekQsT0FBTyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUN6RCxDQUFDO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUNHO0FBQ0gsTUFBTSxVQUFVLGtCQUFrQixDQUFDLElBQVcsRUFBRSxJQUEwQixFQUFFLEVBQXdCO0lBQ2xHLElBQUksSUFBSSxJQUFJLEVBQUUsRUFBRTtRQUNkLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNwQixNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3RCLElBQUksSUFBSSxHQUFvQixJQUFJLENBQUM7UUFFakMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksUUFBUSxFQUFFLENBQUMsQ0FBQyx1QkFBdUI7UUFFckQsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtZQUN4QyxNQUFNLE9BQU8sR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDekIsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUMvQixHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ25CO1lBQ0QsT0FBTyxHQUFHLENBQUM7UUFDYixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFUCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzFCLHNDQUFzQztZQUN0QyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDL0M7UUFFRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzFCLDRCQUE0QjtZQUM1QixJQUFJLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdCLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztZQUNmLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLENBQUMsU0FBUyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Z0JBQ2xELE1BQU0sR0FBRyxTQUFTLENBQUM7YUFDcEI7WUFDRCxJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMvQixJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDakM7UUFFRCxJQUFJLFlBQVksR0FBVSxFQUFFLENBQUM7UUFDN0IsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUNsQixZQUFZLEdBQUcsQ0FBQyxHQUFHLFlBQVksRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDN0MsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRVQsT0FBTyxZQUFZLENBQUM7S0FDckI7U0FBTTtRQUNMLE9BQU8sSUFBSSxDQUFDO0tBQ2I7QUFDSCxDQUFDO0FBRUQsTUFBTSxRQUFRO0lBS1osWUFBWSxNQUFrQixJQUFJO1FBQ2hDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDUixHQUFHLEdBQUc7Z0JBQ0osS0FBSyxFQUFFLENBQUMsQ0FBQztnQkFDVCxVQUFVLEVBQUUsVUFBVTthQUN2QixDQUFDO1NBQ0g7UUFDRCxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ25CLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxPQUFPLENBQUMsQ0FBTSxFQUFFLFNBQWtCO1FBQ2hDLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsS0FBSyxVQUFVLEVBQUU7WUFDekMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3BELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDekQsSUFBSSxTQUFTO29CQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQzthQUN0RDtTQUNGO0lBQ0gsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0dGVyRm9yUHJvcCB9IGZyb20gJy4vY29sdW1uLXByb3AtZ2V0dGVycyc7XG5pbXBvcnQgeyBUYWJsZUNvbHVtblByb3AgfSBmcm9tICcuLi90eXBlcy90YWJsZS1jb2x1bW4udHlwZSc7XG5cbmV4cG9ydCB0eXBlIE9wdGlvbmFsVmFsdWVHZXR0ZXIgPSAocm93OiBhbnkpID0+IGFueSB8IHVuZGVmaW5lZDtcbmV4cG9ydCBmdW5jdGlvbiBvcHRpb25hbEdldHRlckZvclByb3AocHJvcDogVGFibGVDb2x1bW5Qcm9wKTogT3B0aW9uYWxWYWx1ZUdldHRlciB7XG4gIHJldHVybiBwcm9wICYmIChyb3cgPT4gZ2V0dGVyRm9yUHJvcChwcm9wKShyb3csIHByb3ApKTtcbn1cblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9ucyByZWFycmFuZ2UgaXRlbXMgYnkgdGhlaXIgcGFyZW50c1xuICogQWxzbyBzZXRzIHRoZSBsZXZlbCB2YWx1ZSB0byBlYWNoIG9mIHRoZSBpdGVtc1xuICpcbiAqIE5vdGU6IEV4cGVjdGluZyBlYWNoIGl0ZW0gaGFzIGEgcHJvcGVydHkgY2FsbGVkIHBhcmVudElkXG4gKiBOb3RlOiBUaGlzIGFsZ29yaXRobSB3aWxsIGZhaWwgaWYgYSBsaXN0IGhhcyB0d28gb3IgbW9yZSBpdGVtcyB3aXRoIHNhbWUgSURcbiAqIE5PVEU6IFRoaXMgYWxnb3JpdGhtIHdpbGwgZmFpbCBpZiB0aGVyZSBpcyBhIGRlYWRsb2NrIG9mIHJlbGF0aW9uc2hpcFxuICpcbiAqIEZvciBleGFtcGxlLFxuICpcbiAqIElucHV0XG4gKlxuICogaWQgLT4gcGFyZW50XG4gKiAxICAtPiAwXG4gKiAyICAtPiAwXG4gKiAzICAtPiAxXG4gKiA0ICAtPiAxXG4gKiA1ICAtPiAyXG4gKiA3ICAtPiA4XG4gKiA2ICAtPiAzXG4gKlxuICpcbiAqIE91dHB1dFxuICogaWQgLT4gbGV2ZWxcbiAqIDEgICAgICAtPiAwXG4gKiAtLTMgICAgLT4gMVxuICogLS0tLTYgIC0+IDJcbiAqIC0tNCAgICAtPiAxXG4gKiAyICAgICAgLT4gMFxuICogLS01ICAgIC0+IDFcbiAqIDcgICAgIC0+IDhcbiAqXG4gKlxuICogQHBhcmFtIHJvd3NcbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBncm91cFJvd3NCeVBhcmVudHMocm93czogYW55W10sIGZyb20/OiBPcHRpb25hbFZhbHVlR2V0dGVyLCB0bz86IE9wdGlvbmFsVmFsdWVHZXR0ZXIpOiBhbnlbXSB7XG4gIGlmIChmcm9tICYmIHRvKSB7XG4gICAgY29uc3Qgbm9kZUJ5SWQgPSB7fTtcbiAgICBjb25zdCBsID0gcm93cy5sZW5ndGg7XG4gICAgbGV0IG5vZGU6IFRyZWVOb2RlIHwgbnVsbCA9IG51bGw7XG5cbiAgICBub2RlQnlJZFswXSA9IG5ldyBUcmVlTm9kZSgpOyAvLyB0aGF0J3MgdGhlIHJvb3Qgbm9kZVxuXG4gICAgY29uc3QgdW5pcUlEcyA9IHJvd3MucmVkdWNlKChhcnIsIGl0ZW0pID0+IHtcbiAgICAgIGNvbnN0IHRvVmFsdWUgPSB0byhpdGVtKTtcbiAgICAgIGlmIChhcnIuaW5kZXhPZih0b1ZhbHVlKSA9PT0gLTEpIHtcbiAgICAgICAgYXJyLnB1c2godG9WYWx1ZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gYXJyO1xuICAgIH0sIFtdKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgICAvLyBtYWtlIFRyZWVOb2RlIG9iamVjdHMgZm9yIGVhY2ggaXRlbVxuICAgICAgbm9kZUJ5SWRbdG8ocm93c1tpXSldID0gbmV3IFRyZWVOb2RlKHJvd3NbaV0pO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgICAvLyBsaW5rIGFsbCBUcmVlTm9kZSBvYmplY3RzXG4gICAgICBub2RlID0gbm9kZUJ5SWRbdG8ocm93c1tpXSldO1xuICAgICAgbGV0IHBhcmVudCA9IDA7XG4gICAgICBjb25zdCBmcm9tVmFsdWUgPSBmcm9tKG5vZGUucm93KTtcbiAgICAgIGlmICghIWZyb21WYWx1ZSAmJiB1bmlxSURzLmluZGV4T2YoZnJvbVZhbHVlKSA+IC0xKSB7XG4gICAgICAgIHBhcmVudCA9IGZyb21WYWx1ZTtcbiAgICAgIH1cbiAgICAgIG5vZGUucGFyZW50ID0gbm9kZUJ5SWRbcGFyZW50XTtcbiAgICAgIG5vZGUucm93WydsZXZlbCddID0gbm9kZS5wYXJlbnQucm93WydsZXZlbCddICsgMTtcbiAgICAgIG5vZGUucGFyZW50LmNoaWxkcmVuLnB1c2gobm9kZSk7XG4gICAgfVxuXG4gICAgbGV0IHJlc29sdmVkUm93czogYW55W10gPSBbXTtcbiAgICBub2RlQnlJZFswXS5mbGF0dGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgIHJlc29sdmVkUm93cyA9IFsuLi5yZXNvbHZlZFJvd3MsIHRoaXMucm93XTtcbiAgICB9LCB0cnVlKTtcblxuICAgIHJldHVybiByZXNvbHZlZFJvd3M7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHJvd3M7XG4gIH1cbn1cblxuY2xhc3MgVHJlZU5vZGUge1xuICBwdWJsaWMgcm93OiBhbnk7XG4gIHB1YmxpYyBwYXJlbnQ6IGFueTtcbiAgcHVibGljIGNoaWxkcmVuOiBhbnlbXTtcblxuICBjb25zdHJ1Y3Rvcihyb3c6IGFueSB8IG51bGwgPSBudWxsKSB7XG4gICAgaWYgKCFyb3cpIHtcbiAgICAgIHJvdyA9IHtcbiAgICAgICAgbGV2ZWw6IC0xLFxuICAgICAgICB0cmVlU3RhdHVzOiAnZXhwYW5kZWQnXG4gICAgICB9O1xuICAgIH1cbiAgICB0aGlzLnJvdyA9IHJvdztcbiAgICB0aGlzLnBhcmVudCA9IG51bGw7XG4gICAgdGhpcy5jaGlsZHJlbiA9IFtdO1xuICB9XG5cbiAgZmxhdHRlbihmOiBhbnksIHJlY3Vyc2l2ZTogYm9vbGVhbikge1xuICAgIGlmICh0aGlzLnJvd1sndHJlZVN0YXR1cyddID09PSAnZXhwYW5kZWQnKSB7XG4gICAgICBmb3IgKGxldCBpID0gMCwgbCA9IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGNoaWxkID0gdGhpcy5jaGlsZHJlbltpXTtcbiAgICAgICAgZi5hcHBseShjaGlsZCwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKSk7XG4gICAgICAgIGlmIChyZWN1cnNpdmUpIGNoaWxkLmZsYXR0ZW4uYXBwbHkoY2hpbGQsIGFyZ3VtZW50cyk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=
