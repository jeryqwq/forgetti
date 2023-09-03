import { useMemo as _useMemo } from "react";
import { $$cache as _$$cache } from "forgetti/runtime";
import { $$equals as _$$equals } from "forgetti/runtime";
import { memo as _memo } from "react";
import { $$memo as _$$memo } from "forgetti/runtime";
const _Memo = _$$memo(_memo, _values => <div className={_values[0]}>
      <div className="todo-item-content">{_values[1]}</div>
      <div className="todo-item-actions">
        <button type="button" className={_values[2]} onClick={_values[3]}>
          {_values[4]}
        </button>
        <button type="button" className="todo-item-delete" onClick={_values[5]}>
          Delete
        </button>
      </div>
    </div>),
  _Memo2 = _$$memo(_memo, _values2 => <form className="todo-list-form" onSubmit={_values2[0]}>
      <input type="text" value={_values2[1]} onInput={_values2[2]} />
      <button type="submit" disabled={_values2[3]}>
        Add
      </button>
    </form>),
  _Memo3 = _$$memo(_memo, _values3 => {
    const _Component = _values3[0];
    return <>
      <_Component setList={_values3[1]} index={_values3[2]} setIndex={_values3[3]} />
      <div className="todo-list">
        {_values3[4]}
      </div>
    </>;
  }),
  _Memo4 = _$$memo(_memo, _values4 => {
    const _Component2 = _values4[0];
    return <_Component2 item={_values4[1]} setList={_values4[2]} />;
  }),
  _Memo5 = _$$memo(_memo, _values5 => {
    const _Component3 = _values5[0];
    return <div className="app">
      <h1>Todo List</h1>
      <_Component3 />
    </div>;
  });
const TodoListItem = function ({
  item,
  setList
}) {
  let _cache = _$$cache(_useMemo, 23);
  const [done, setDone] = useState(false);
  let _equals = _$$equals(_cache, 0, item),
    _value = _equals ? _cache[0] : _cache[0] = item,
    _value2 = _equals ? _cache[1] : _cache[1] = _value.message,
    _equals2 = _$$equals(_cache, 2, _value2),
    _value3 = _equals2 ? _cache[2] : _cache[2] = _value2;
  _equals2 ? _cache[3] : _cache[3] = console.log("todo Item:", _value3);
  let _equals3 = _$$equals(_cache, 4, done),
    _value6 = _equals3 ? _cache[4] : _cache[4] = done,
    _value5;
  if (_value6) {
    _value5 = "complete";
  } else {
    _value5 = "pending";
  }
  let _equals4 = _$$equals(_cache, 5, _value5),
    _value7 = _equals4 ? _cache[5] : _cache[5] = _value5,
    _value8 = _equals4 ? _cache[6] : _cache[6] = `todo-item ${_value7}`,
    _equals5 = _$$equals(_cache, 7, _value8),
    _value9 = _equals5 ? _cache[7] : _cache[7] = _value8,
    _value10 = _equals ? _cache[8] : _cache[8] = _value.message,
    _equals6 = _$$equals(_cache, 9, _value10),
    _value11 = _equals6 ? _cache[9] : _cache[9] = _value10,
    _value12;
  if (_value6) {
    _value12 = "complete";
  } else {
    _value12 = "pending";
  }
  let _equals7 = _$$equals(_cache, 10, _value12),
    _value13 = _equals7 ? _cache[10] : _cache[10] = _value12,
    _value14 = _equals7 ? _cache[11] : _cache[11] = `todo-item-toggle ${_value13}`,
    _equals8 = _$$equals(_cache, 12, _value14),
    _value15 = _equals8 ? _cache[12] : _cache[12] = _value14,
    _equals9 = _$$equals(_cache, 13, setDone),
    _value16 = _equals9 ? _cache[13] : _cache[13] = setDone,
    _value17 = _equals9 && _equals3 ? _cache[14] : _cache[14] = () => {
      setDone(!done);
    },
    _equals11 = _$$equals(_cache, 15, _value17),
    _value18 = _equals11 ? _cache[15] : _cache[15] = _value17,
    _value19;
  if (_value6) {
    _value19 = "Completed";
  } else {
    _value19 = "Pending";
  }
  let _equals12 = _$$equals(_cache, 16, _value19),
    _value20 = _equals12 ? _cache[16] : _cache[16] = _value19,
    _equals13 = _$$equals(_cache, 17, setList),
    _value21 = _equals13 ? _cache[17] : _cache[17] = setList,
    _value22 = _equals13 && _equals ? _cache[18] : _cache[18] = () => {
      setList(list => list.filter(value => value.id !== item.id));
    },
    _equals15 = _$$equals(_cache, 19, _value22),
    _value23 = _equals15 ? _cache[19] : _cache[19] = _value22,
    _value24 = _equals5 && _equals6 && _equals8 && _equals11 && _equals12 && _equals15 ? _cache[20] : _cache[20] = [_value9, _value11, _value15, _value18, _value20, _value23],
    _equals17 = _$$equals(_cache, 21, _value24),
    _value25 = _equals17 ? _cache[21] : _cache[21] = _value24;
  return _equals17 ? _cache[22] : _cache[22] = /*@forgetti jsx*/<_Memo v={_value25} />;
};

// interface TodoListFormProps {
//   index: number;
//   setIndex: (update: number) => void;
//   setList: (action: (list: TodoItem[]) => TodoItem[]) => void;
// }

const TodoListForm = function ({
  setList,
  index,
  setIndex
}) {
  let _cache2 = _$$cache(_useMemo, 15);
  const [message, setMessage] = useState("");
  let _equals18 = _$$equals(_cache2, 0, message),
    _value27 = _equals18 ? _cache2[0] : _cache2[0] = message;
  _equals18 ? _cache2[1] : _cache2[1] = console.log("form render", _value27);
  let _equals19 = _$$equals(_cache2, 2, setList),
    _value29 = _equals19 ? _cache2[2] : _cache2[2] = setList,
    _equals20 = _$$equals(_cache2, 3, index),
    _value30 = _equals20 ? _cache2[3] : _cache2[3] = index,
    _equals21 = _$$equals(_cache2, 4, setIndex),
    _value31 = _equals21 ? _cache2[4] : _cache2[4] = setIndex,
    _equals22 = _$$equals(_cache2, 5, setMessage),
    _value32 = _equals22 ? _cache2[5] : _cache2[5] = setMessage,
    _value33 = _equals19 && _equals18 && _equals20 && _equals21 && _equals22 ? _cache2[6] : _cache2[6] = e => {
      e.preventDefault();
      setList(list => [...list, {
        done: false,
        message,
        id: index
      }]);
      setIndex(index + 1);
      setMessage("");
    },
    _equals24 = _$$equals(_cache2, 7, _value33),
    _value34 = _equals24 ? _cache2[7] : _cache2[7] = _value33,
    _value35 = _equals22 ? _cache2[8] : _cache2[8] = e => {
      setMessage(e.target.value);
    },
    _equals25 = _$$equals(_cache2, 9, _value35),
    _value36 = _equals25 ? _cache2[9] : _cache2[9] = _value35,
    _value37 = _equals18 ? _cache2[10] : _cache2[10] = _value27 === "",
    _equals26 = _$$equals(_cache2, 11, _value37),
    _value38 = _equals26 ? _cache2[11] : _cache2[11] = _value37,
    _value39 = _equals24 && _equals18 && _equals25 && _equals26 ? _cache2[12] : _cache2[12] = [_value34, _value27, _value36, _value38],
    _equals28 = _$$equals(_cache2, 13, _value39),
    _value40 = _equals28 ? _cache2[13] : _cache2[13] = _value39;
  return _equals28 ? _cache2[14] : _cache2[14] = /*@forgetti jsx*/<_Memo2 v={_value40} />;
};
function TodoList() {
  let _cache3 = _$$cache(_useMemo, 14);
  const [list, setList] = useState(0 in _cache3 ? _cache3[0] : _cache3[0] = []);
  const [index, setIndex] = useState(0);
  1 in _cache3 ? _cache3[1] : _cache3[1] = console.log("todolist wrap render");
  let _value44 = 2 in _cache3 ? _cache3[2] : _cache3[2] = TodoListForm,
    _equals29 = _$$equals(_cache3, 3, setList),
    _value45 = _equals29 ? _cache3[3] : _cache3[3] = setList,
    _equals30 = _$$equals(_cache3, 4, index),
    _value46 = _equals30 ? _cache3[4] : _cache3[4] = index,
    _equals31 = _$$equals(_cache3, 5, setIndex),
    _value47 = _equals31 ? _cache3[5] : _cache3[5] = setIndex,
    _equals32 = _$$equals(_cache3, 6, list),
    _value48 = _equals32 ? _cache3[6] : _cache3[6] = list,
    _value49 = _equals29 ? _cache3[7] : _cache3[7] = item => /*@forgetti jsx*/<_Memo4 key={item.id} v={[TodoListItem, item, setList]} />,
    _equals33 = _$$equals(_cache3, 8, _value49),
    _value50 = _equals33 ? _cache3[8] : _cache3[8] = _value49,
    _value51 = _equals32 && _equals33 ? _cache3[9] : _cache3[9] = _value48.map(_value50),
    _equals35 = _$$equals(_cache3, 10, _value51),
    _value52 = _equals35 ? _cache3[10] : _cache3[10] = _value51,
    _value53 = _equals29 && _equals30 && _equals31 && _equals35 ? _cache3[11] : _cache3[11] = [_value44, _value45, _value46, _value47, _value52],
    _equals37 = _$$equals(_cache3, 12, _value53),
    _value54 = _equals37 ? _cache3[12] : _cache3[12] = _value53;
  return _equals37 ? _cache3[13] : _cache3[13] = /*@forgetti jsx*/<_Memo3 v={_value54} />;
}
export default function App() {
  let _cache4 = _$$cache(_useMemo, 1);
  return 0 in _cache4 ? _cache4[0] : _cache4[0] = /*@forgetti jsx*/<_Memo5 v={[TodoList]} />;
}
