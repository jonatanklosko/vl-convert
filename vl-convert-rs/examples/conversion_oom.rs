use vl_convert_rs::converter::VlOpts;
use vl_convert_rs::{VlConverter, VlVersion};

use std::fs::File;
use std::io::BufReader;

#[tokio::main]
async fn main() {
    let path = "vl-convert-rs/examples/oom_vl_spec.json";
    let file = File::open(path).unwrap();
    let reader = BufReader::new(file);

    let vl_spec: serde_json::Value = serde_json::from_reader(reader).unwrap();

    let mut converter = VlConverter::new();

    let result = converter
        .vegalite_to_svg(
            vl_spec,
            VlOpts {
                vl_version: VlVersion::v5_8,
                ..Default::default()
            },
        )
        .await
        .expect("Failed to perform Vega-Lite to Vega conversion");

    println!("{}", result)
}
