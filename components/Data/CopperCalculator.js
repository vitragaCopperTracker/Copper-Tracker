import React, { useState, useEffect } from "react";
import * as s from "./styles";
import { COPPER_SPOT_PRICE_LB } from "@/src/constants";

const CopperCalculator = () => {
  const [weight, setWeight] = useState(1);
  const [unit, setUnit] = useState(1);
  const [grade, setGrade] = useState(1);
  const [result, setResult] = useState(COPPER_SPOT_PRICE_LB);
  const spotPrice = COPPER_SPOT_PRICE_LB;

  useEffect(() => {
    const calculatedValue = weight * unit * grade * spotPrice;
    setResult(calculatedValue);
  }, [weight, unit, grade]);

  return (
    <section id="calculator" style={{ ...s.sec, ...s.secAlt }}>
      <div style={s.w}>
        <p style={s.slbl}>Section I &middot; Interactive tool</p>
        <h2 style={s.stitle}>Copper Value &amp; Unit Conversion Calculator</h2>
        <p style={s.sdesc}>
          Calculate the value of copper by weight and grade. Convert between all
          standard units. Price runs client-side &mdash; no data sent anywhere.
        </p>

        <div className="flex flex-col gap-5">
          <div
            style={{
              background: s.tokens.cuBg,
              border: `1px solid ${s.tokens.cuGlow}`,
              borderRadius: s.tokens.rl,
              padding: "22px",
            }}
          >
            <p
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: s.tokens.cuD,
                marginBottom: "16px",
              }}
            >
              Copper Value Calculator
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                marginBottom: "12px",
              }}
            >
              <div>
                <label
                  style={{
                    fontSize: "11px",
                    color: s.tokens.muted,
                    display: "block",
                    marginBottom: "4px",
                  }}
                >
                  Weight
                </label>
                <input
                  type="number"
                  value={weight}
                  min="0"
                  step="0.1"
                  onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
                  style={s.ccInput}
                />
              </div>
              <div>
                <label
                  style={{
                    fontSize: "11px",
                    color: s.tokens.muted,
                    display: "block",
                    marginBottom: "4px",
                  }}
                >
                  Unit
                </label>
                <select
                  value={unit}
                  onChange={(e) => setUnit(parseFloat(e.target.value))}
                  style={s.ccSelect}
                >
                  <option value="1">Pound (lb)</option>
                  <option value="2.20462">Kilogram</option>
                  <option value="2204.62">Metric tonne</option>
                  <option value="2000">Short ton (US)</option>
                  <option value="0.002205">Gram</option>
                </select>
              </div>
            </div>
            <div style={{ marginBottom: "14px" }}>
              <label
                style={{
                  fontSize: "11px",
                  color: s.tokens.muted,
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                Copper grade / scrap type
              </label>
              <select
                value={grade}
                onChange={(e) => setGrade(parseFloat(e.target.value))}
                style={s.ccSelect}
              >
                <option value="1">LME Grade A cathode (99.99% pure)</option>
                <option value="0.95">Bare bright wire (~95% of spot)</option>
                <option value="0.92">#1 copper scrap (~92% of spot)</option>
                <option value="0.85">#2 copper scrap (~85% of spot)</option>
                <option value="0.75">
                  #1 insulated wire (copper content varies)
                </option>
                <option value="0.60">#2 insulated wire / light copper</option>
              </select>
            </div>
            <div style={s.ccResult}>
              <p
                style={{
                  fontSize: "11px",
                  color: s.tokens.muted,
                  marginBottom: "4px",
                }}
              >
                Estimated value at $5.80/lb spot
              </p>
              <p style={s.ccV}>
                $
                {result.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
              <p style={s.ccS}>
                {weight} {unit === 1 ? "lb" : "units"} &times;{" "}
                {(grade * 100).toFixed(0)}% &times; $5.80/lb
              </p>
            </div>
          </div>

          <div
            style={{
              background: s.tokens.white,
              border: `1px solid ${s.tokens.bdr}`,
              borderRadius: s.tokens.rl,
              padding: "22px",
            }}
          >
            <p
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: s.tokens.ink,
                marginBottom: "10px",
              }}
            >
              Price Conversions
            </p>
            <table
              style={{
                width: "100%",
                fontSize: "12px",
                borderCollapse: "collapse",
                marginBottom: "20px",
              }}
            >
              <thead>
                <tr style={{ borderBottom: `2px solid ${s.tokens.bdr}` }}>
                  {["From", "To $/lb", "To $/tonne"].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "6px 10px",
                        textAlign: "left",
                        fontSize: "10px",
                        color: s.tokens.muted,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["$5.80/lb", "—", "$12,787/t"],
                  ["$12,787/t", "$5.80/lb", "—"],
                ].map(([from, toLb, toT], i) => (
                  <tr
                    key={i}
                    style={{ borderBottom: "1px solid rgba(26,26,46,0.05)" }}
                  >
                    {[from, toLb, toT].map((v, j) => (
                      <td
                        key={j}
                        style={{
                          padding: "7px 10px",
                          fontFamily: '"DM Mono", monospace',
                          color: j === 0 ? s.tokens.cuD : undefined,
                        }}
                      >
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            <p
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: s.tokens.ink,
                marginBottom: "10px",
              }}
            >
              Weight Conversions
            </p>
            <table
              style={{
                width: "100%",
                fontSize: "12px",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr style={{ borderBottom: `2px solid ${s.tokens.bdr}` }}>
                  {["Unit", "In lbs", "In kg"].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "6px 10px",
                        textAlign: "left",
                        fontSize: "10px",
                        color: s.tokens.muted,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["1 metric tonne", "2,204.62 lbs", "1,000 kg"],
                  ["1 short ton (US)", "2,000 lbs", "907.2 kg"],
                  ["1 pound (lb)", "—", "0.4536 kg"],
                  ["1 troy oz", "0.0686 lbs", "31.10 g"],
                ].map(([unit, lbs, kg], i, arr) => (
                  <tr
                    key={i}
                    style={
                      i < arr.length - 1
                        ? { borderBottom: "1px solid rgba(26,26,46,0.05)" }
                        : {}
                    }
                  >
                    {[unit, lbs, kg].map((v, j) => (
                      <td
                        key={j}
                        style={{
                          padding: "7px 10px",
                          fontFamily: '"DM Mono", monospace',
                        }}
                      >
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <p
              style={{
                fontSize: "11px",
                color: s.tokens.muted,
                marginTop: "12px",
                paddingTop: "10px",
                borderTop: `1px solid ${s.tokens.bdr}`,
              }}
            >
              Conversion: $/t &times; 2204.62 = $/lb equivalent &middot; COMEX
              HG contract: 25,000 lbs/contract &middot; At $5.80/lb, one full
              contract = $145,000 notional
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CopperCalculator;
