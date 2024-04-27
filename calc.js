class Screen
{
    #link;

    constructor(tagId = null)
    {
        this.#link = document.getElementById(tagId);

        if( !this.#link )
        {
            let mesage = `${this.#link} -- Screen ID invalid!`;
            console.error(mesage);
            throw mesage;
        }

        this.clear();
    }

    addValue(value)
    {
        this.#link.textContent += value;
    }

    getValue()
    {
        return this.#link.textContent;
    }

    clear()
    {
        this.#link.textContent = '';
    }
}

class Calculator
{
    #screen_exp;
    #screen_res;
    #buttons;
    #expression;
    #lastKey;
    #result;

    static Scr = Object.freeze({
        Expression: 'expression',
        Result: 'result',
    })

    static Btn = Object.freeze(
    {
        Value: 'value',
        Signal: 'signal',
        Clear: 'clear',
        Evaluate: 'evaluate',
    });

    constructor()
    {
        this.#buttons = [];
        this.#lastKey = null;
    }

    addButtonById(id = '', type = Calculator.Btn.Value)
    {
        if( !id  )
        {
            let mesage = "Button id invalid!";
            console.error(mesage);
            throw mesage;
        }

        let btt = document.getElementById(id);

        if(type === Calculator.Btn.Value)
        {
            btt.addEventListener('click', () => {
                this.screen_exp.addValue(btt.value);
                this.updateExp();
                this.lastTypeKey = Calculator.Btn.Value;
            });
        }
        else if(type === Calculator.Btn.Signal)
        {
            btt.addEventListener('click', () => {
                if( this.lastTypeKey !== Calculator.Btn.Signal)
                {
                    this.screen_exp.addValue(btt.value);
                    this.lastTypeKey = Calculator.Btn.Signal;
                    this.updateExp();
                }
                else
                    console.error("duplicate key signal");
            });
        }
        else if(type === Calculator.Btn.Clear)
        {
            btt.addEventListener('click', () => {
                this.screen_exp.clear();
                this.screen_res.clear();
                this.lastTypeKey = Calculator.Btn.Clear;
                this.updateExp();
            });
        }
        else if(type === Calculator.Btn.Evaluate)
        {
            btt.addEventListener('click', () => {
                this.lastTypeKey = Calculator.Btn.Evaluate;
                this.evaluate();
            });
        }

        this.#buttons.push(btt);
    }

    addScreenById(id, type = Calculator.Scr.Expression)
    {
        if( !id )
        {
            let mesage = "Screen id invalid!";
            console.error(mesage);
            throw mesage;
        }
        if(type === Calculator.Scr.Expression)
            this.#screen_exp = new Screen(id);
        else if(type === Calculator.Scr.Result)
            this.#screen_res = new Screen(id);
        else
            console.error(`Screen (${type}) type invalid`);

    }

    evaluate()
    {
        this.#result = eval(this.#expression);
        this.#screen_res.clear();
        this.#screen_res.addValue(this.#result);
    }

    updateExp()
    {
        this.expression = this.screen_exp.getValue();
    }

    set lastTypeKey(key){
        this.#lastKey = key;
    }

    get lastTypeKey()
    {
        return this.#lastKey;
    }

    get screen_exp()
    {
        return this.#screen_exp;
    }

    get screen_res()
    {
        return this.#screen_res;
    }

    get buttons()
    {
        return this.#buttons;
    }

    get expression()
    {
        return this.#expression;
    }

    set expression(newExp)
    {
        this.#expression = newExp;
    }

    get result()
    {
        return this.#result;
    }

    set result(value)
    {
        this.#result = value;
    }

    get eval()
    {
        return this.#expression;
    }

    set eval(value)
    {
        this.#expression = value;
    }

}


const calc = new Calculator();

calc.addScreenById('screen');
calc.addScreenById('result', Calculator.Scr.Result);

calc.addButtonById('n0');
calc.addButtonById('n1');
calc.addButtonById('n2');
calc.addButtonById('n3');
calc.addButtonById('n4');
calc.addButtonById('n5');
calc.addButtonById('n6');
calc.addButtonById('n7');
calc.addButtonById('n8');
calc.addButtonById('n9');

calc.addButtonById('sum', Calculator.Btn.Signal);
calc.addButtonById('sub', Calculator.Btn.Signal);
calc.addButtonById('div', Calculator.Btn.Signal);
calc.addButtonById('mul', Calculator.Btn.Signal);

calc.addButtonById('clear', Calculator.Btn.Clear);
calc.addButtonById('eval', Calculator.Btn.Evaluate);

