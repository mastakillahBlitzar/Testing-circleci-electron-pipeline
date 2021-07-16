use itertools::Itertools;
use neon::prelude::*;

fn sum_array(mut cx: FunctionContext) -> JsResult<JsNumber> {
    let arr: Handle<JsArray> = cx.argument(0)?;
    let vec = arr.to_vec(&mut cx)?;
    let sum = vec
        .into_iter()
        .map(|val| {
            let num = Handle::downcast_or_throw::<JsNumber, _>(&val, &mut cx)?.value(&mut cx);
            Ok(num)
        })
        .fold_ok(0_f64, |a, b| a + b)?;

    Ok(cx.number(sum))
}

#[neon::main]
fn main(mut cx: ModuleContext) -> NeonResult<()> {
    cx.export_function("sumArray", sum_array)?;
    Ok(())
}
