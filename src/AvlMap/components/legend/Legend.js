import React, {Component} from 'react';

import styled from "styled-components"

import * as d3scale from "d3-scale"
import * as d3format from "d3-format"

const MainContainer = styled.div`
  background-color: ${ props => props.theme.sidePanelHeaderBg };
  width: 100%;
  padding: ${
    props => (
      props.align === "vertical" ? (props.compact ? "5px" : "10px") :
        (props.compact ? "5px 5px 0px 5px" : "10px 10px 0px 10px")
    )
  };
`

const StyledTitle = styled.div`
  color: ${ props => props.theme.textColorHl };
  font-weight: bold;
  font-size: ${ props => props.compact ? 1 : 1.25 }rem;
  margin-bottom: ${ props => props.compact ? 0 : 0.25 }rem;
`
const Title = ({ Title, layer, compact }) =>
  <StyledTitle compact={ compact }>
    { typeof Title === "function" ?
      <Title layer={ layer }/>
      : Title
    }
  </StyledTitle>

const LegendContainer = styled.div`
  width: 100%;
  display: flex;
  color: ${ props => props.theme.textColor };
  border-radius: 4px;
  overflow: hidden;
`
const ColorBlock = styled.div`
  align-items: stretch;
  flex-grow: 1;
  height: ${ props => props.compact ? 10 : 20 }px;
`
const TextBlock = styled.div`
  color: ${ props => props.theme.textColor };
  display: inline-block;
  text-align: right;
`
const VerticalColorBlock = styled.div`
  width: 20px;
  height: ${ props => props.height || 20 }px;
`

const HorizontalLegend = ({ type, format, scale, range, domain, subText, title, layer, compact = false }) => {

  const textBlock = {
    width: (100 / (type === 'linear' ? scale.ticks(5).length : range.length)) + '%'
  }
  const subTextBlock = {
    width: subText ? ((100) / (type === 'linear' ? scale.ticks(5).length : range.length)) * Math.floor((type === 'linear' ? scale.ticks(5).length : range.length) / subText.length) + '%' : '',
    textAlign: 'center'
  }
  const subTextBlockMiddle = {
    width: subText ? (((100) / (type === 'linear' ? scale.ticks(5).length : range.length)) * Math.floor((type === 'linear' ? scale.ticks(5).length : range.length) / subText.length)) +
        (100 / (type === 'linear' ? scale.ticks(5).length : range.length)) + '%' : '',
      textAlign: 'center'
  }
  const subTextDiv = (i, r = undefined) =>
      <TextBlock key={ i } style={
      subText.length % 2 !== 0 && i / Math.floor(range.length/subText.length) === Math.floor(subText.length/2) ?
          {...subTextBlockMiddle} :
          {...subTextBlock}
  }>{
      r && typeof scale.invertExtent(r)[1] === "number" ?
          subText[i / Math.floor(range.length/subText.length)] : null }
  </TextBlock>

  return (
    <MainContainer align={ "horizontal" } compact={ compact }>
      { !title ? null : <Title Title={ title } layer={ layer } compact={ compact }/> }
      <LegendContainer className='legend-container' compact={ compact }>
        {
          type === "linear" ?
            scale.ticks(5).map(t => <ColorBlock compact={ compact } key={ t } style={ { backgroundColor: scale(t), ...textBlock } }/>)
          :
            range.map((r, i) => <ColorBlock compact={ compact } key={ i } style={ { backgroundColor: r, ...textBlock } }/>)
        }
      </LegendContainer>
      <div style={ { width:'100%', position: 'relative', right: compact ? 0 : -3 } }>
        {
          type === "ordinal" ?
            domain.map(d => <TextBlock key={ d } style={ textBlock } >{ format(d) }</TextBlock>)
          : type === "linear" ?
            scale.ticks(5).map(t => <TextBlock key={ t } style={ textBlock }>{ format(t) }</TextBlock>)
          :
            range.map((r, i) => <TextBlock key={ i } style={ textBlock }>{ typeof scale.invertExtent(r)[1] === "number" ? format(scale.invertExtent(r)[1]) : null }</TextBlock>)
        }
      </div>
        <div style={{width:'100%', position: 'relative', right: -3}}>
            {
                subText ?
                type === "ordinal" ?
                    domain.map((d, dI) => dI % Math.floor(scale.ticks(5).length/subText.length) === 0 ? subTextDiv(dI) : null)
                    : type === "linear" ?
                    scale.ticks(5).map((t, tI) => tI % Math.floor(scale.ticks(5).length/subText.length) === 0 ? subTextDiv(tI) : null)
                    : range.map((r, i) => i % Math.floor(range.length/subText.length) === 0 ? subTextDiv(i,r) : null) : null
            }
      </div>
    </MainContainer>
  )
}

const VerticalLegend = ({ type, format, scale, range, domain, title, layer, compact = false }) => {
  range = (type === "linear") ? scale.ticks(5).map(t => scale(t)) : range
  return (
    <MainContainer align={ "vertical" } compact={ compact }>
      { !title ? null : <Title Title={ title } layer={ layer }/> }
      <table>
        <tbody>
          {
            type === "ordinal" ?
              domain.map(d =>
                <tr key={ d }>
                  <td>
                    <VerticalColorBlock style={ { backgroundColor: scale(d) } }/>
                  </td>
                  <td style={ { paddingLeft: "5px" } }>
                    { format(d) }
                  </td>
                </tr>
              )
            : type === "quantile" ?
              range.map((r, i) =>
                <tr key={ r }>
                  <td>
                    <VerticalColorBlock height={ 40 }
                      style={ { backgroundColor: r } }/>
                  </td>
                  <td>
                    { typeof scale.invertExtent(r)[1] === "number" ? format(scale.invertExtent(r)[1]) : null }
                  </td>
                </tr>
              )
            : null
          }
        </tbody>
      </table>
    </MainContainer>
  )
}

 class Legend extends Component {

  getScale() {
    switch (this.props.type) {
      case "ordinal":
        return d3scale.scaleOrdinal();
      case "quantile":
        return d3scale.scaleQuantile();
      case "quantize":
        return d3scale.scaleQuantize();
      case "threshold":
        return d3scale.scaleThreshold();
      default:
        return d3scale.scaleLinear();
    }
  }

  render() {
    let { vertical, format, domain, range } = this.props;

    const scale = this.getScale()
      .domain(domain)
      .range(range);

    if (typeof format === "string") {
      format = d3format.format(format);
    }

    return vertical ?
      <VerticalLegend { ...this.props }
        scale={ scale } format={ format }/>
    :
      <HorizontalLegend { ...this.props }
        scale={ scale } format={ format }/>;
  }
}

Legend.defaultProps = {
  title: '',
  range: [],
  domain: [],
  type: "linear",
  format: d => d,
  vertical: false
}

export default Legend
