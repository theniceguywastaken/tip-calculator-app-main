import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function TipCalculatorCard() {
    const tips = [5, 10, 15, 25, 50];
    const [bill, setBill] = useState(0);
    const [people, setPeople] = useState(0);
    const [selectedPercent, setSelectedPercent] = useState(null);
    const [customPercent, setCustomPercent] = useState(0);

    const handleTipSelection = (percent) => {
        setSelectedPercent(percent);
        setCustomPercent("");
    };
    const handleCustomTip = (e) => {
        setCustomPercent(Number(e.target.value));
        if (selectedPercent !== null) {
            setSelectedPercent(null);
        }
    };

    let tipAmount;
    let total;
    if (bill && people && (selectedPercent !== 0 || customPercent !== 0)) {
        let percent =
            selectedPercent === null ? customPercent : selectedPercent;
        console.log(percent);
        tipAmount = Number(((bill * (percent / 100)) / people).toFixed(2));
        total = (bill / people + tipAmount).toFixed(2);
    } else {
        tipAmount = 0;
        total = 0;
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
            </header>
            <div>
                <div>
                    <BillForm
                        bill={bill}
                        onBillChange={setBill}
                        people={people}
                        onPeopleChange={setPeople}
                        tips={tips}
                        selectedPercent={selectedPercent}
                        onTipSelection={handleTipSelection}
                        customPercent={customPercent}
                        onCustomPercentChange={handleCustomTip}
                    />
                </div>
                <div>
                    <Amount text={"Tip Amount"} amount={tipAmount} />
                    <Amount text={"Total"} amount={total} />
                    <button>RESET</button>
                </div>
            </div>
        </div>
    );
}

function TipSelect({
    tips,
    selectedPercent,
    onTipSelection,
    customPercent,
    onCustomPercentChange,
}) {
    let tipsSelect = tips.map((tip) => {
        return (
            <div key={tip}>
                <input
                    type="radio"
                    name="tip"
                    id={tip}
                    value={tip}
                    checked={selectedPercent === tip}
                    onChange={() => onTipSelection(tip)}
                />
                <label htmlFor={tip}>{tip}%</label>
            </div>
        );
    });
    return (
        <fieldset>
            <legend>Select Tip %</legend>
            {tipsSelect}
            <div>
                <input
                    type="number"
                    id="custom"
                    placeholder="Custom"
                    value={customPercent}
                    onChange={onCustomPercentChange}
                    min={0}
                />
            </div>
        </fieldset>
    );
}

function BillForm({
    bill,
    onBillChange,
    people,
    onPeopleChange,
    tips,
    selectedPercent,
    onTipSelection,
    customPercent,
    onCustomPercentChange,
}) {
    return (
        <form action="">
            <label htmlFor="billInput">Bill</label>
            <input
                type="number"
                id="billInput"
                placeholder="0"
                value={bill}
                onChange={(e) => {
                    onBillChange(e.target.value);
                }}
                min={0}
            />
            <TipSelect
                tips={tips}
                selectedPercent={selectedPercent}
                onTipSelection={onTipSelection}
                customPercent={customPercent}
                onCustomPercentChange={onCustomPercentChange}
            />
            <label htmlFor="people">Number of People</label>
            <input
                type="number"
                id="people"
                placeholder="0"
                value={people}
                onChange={(e) => {
                    onPeopleChange(e.target.value);
                }}
                min={0}
            />
        </form>
    );
}

function Amount({ text, amount }) {
    return (
        <div>
            <div>
                <p>{text}</p>
                <span>/ person</span>
            </div>
            <div>
                <p>${amount}</p>
            </div>
        </div>
    );
}

function App() {
    return <TipCalculatorCard />;
}

export default App;
