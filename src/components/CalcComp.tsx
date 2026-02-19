import { useState, useRef, useEffect } from "react";
import "./CalcComp.css";
import HistoryComp from "./HistoryComp";

const CalcComp: React.FC = () => {
    const [inp1, setInp1] = useState<number | string>('');
    const [inp2, setInp2] = useState<number | string>('');
    const [op, setOp] = useState<string>('');
    const [calc, setCalc] = useState<number | string>('');
    const [history, setHistory] = useState<string[]>([]);

    const inp1Ref = useRef<HTMLInputElement>(null);
    const inp2Ref = useRef<HTMLInputElement>(null);
    const opRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const saved = localStorage.getItem("oldHistory");
        if (!saved) return;
        setHistory(JSON.parse(saved));
    }, [])

    useEffect(() => {
        if (history.length === 0) return;
        localStorage.setItem('oldHistory', JSON.stringify(history));
        console.log(history);
    }, [calc])

    function validate(): boolean {
        if (inp1 == '') {
            alert('Please fill in all fields!');
            inp1Ref.current?.focus();
            return false;
        }
        if (op == '') {
            alert('Please choose an operation');
            opRef.current?.focus();
            return false;
        }
        if (inp2 == '') {
            alert('Please fill in all fields!');
            inp2Ref.current?.focus();
            return false;
        }
        return true;
    }

    function submitHandler(e: React.ChangeEvent) {
        e.preventDefault();
        let res: number;
        if (validate()) {
            let inp11 = Number(inp1);
            let inp22 = Number(inp2);
            switch (op) {
                case '+':
                    res = inp11 + inp22;
                    break;
                case '-':
                    res = inp11 - inp22;
                    break;
                case '*':
                    res = inp11 * inp22;
                    break;
                case '/':
                    if (inp2 === 0) {
                        alert('Nullával oztás - értelmezhetetlen!')
                        return;
                    }
                    res = inp11 / inp22;
                    break;
                default:
                    return 0;
            }
            setCalc(res);
            setHistory(prev => [...prev, `${inp1}${op}${inp2}=${res}`]);
            setInp1(0);
            setInp2(0);
            inp1Ref.current?.focus();
        }
    }

    function clrHist() {
            setHistory([]);
            localStorage.removeItem('oldHistory');
            setCalc('');
    }

    return (
        <div className="cont">
            <section>
                <form onSubmit={submitHandler} className="p-3 flex flex-col items-center gap-1">
                    <article>
                        <input type="number" name="n1"
                            onChange={e => setInp1(e.target.value !== '' ? Number(e.target.value) : '')}
                            value={inp1}
                            ref={inp1Ref}
                            autoFocus
                        />
                        <select className="text-center" name="op" onChange={e => setOp(e.target.value)}>
                            <option value="+">+</option>
                            <option value="-">-</option>
                            <option value="*">*</option>
                            <option value="/">/</option>
                            <option value="" selected hidden>Művelet</option> {/*hidden - nem választható!*/}
                        </select>
                        <input type="number" name="n2" id=""
                            onChange={e => setInp2(e.target.value !== '' ? Number(e.target.value) : '')}
                            value={inp2}
                        />
                        <input type="number" name="result" ref={inp2Ref}
                            value={calc}
                        />
                    </article>
                    <div className="btns flex gap-2">
                        <button className="pt-0.5 pb-0.5 pl-1 pr-1 rounded-lg" type="submit" autoFocus >Számol</button>
                       {history.length > 0 &&  <button className="pt-0.5 pb-0.5 pl-1 pr-1 rounded-lg rem" type="button" onClick={clrHist}>Töröl</button>}
                    </div>
                </form>
            </section>
            <section className="flex justify-center font-bold">
                <ul className="mt-3 text-shadow-red-950 text-shadow-md">
                    {history.map((h, i) => (
                        <HistoryComp key={i} calcHistory={h} />
                    ))}
                </ul>
            </section>
        </div>
    )
}

export default CalcComp;
