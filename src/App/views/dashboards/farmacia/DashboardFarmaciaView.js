import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Typography } from "@material-ui/core";
import React, { Component } from "react";
import { Row, Col, Card } from 'react-bootstrap';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from "@material-ui/styles";
import dashboardService from "src/App/services/Dashboard/DashboardFarmaciaService"
import messageService from "src/App/services/MessageService.js";
import { Chart } from "react-google-charts";
import { maskNumericValue } from "src/App/utils/formatterHelper";

class DashboardFarmaciaView extends Component {

  state = {
    dataLoadingStatus: 'ready',
    chartData: [],
    mesSelecionado: undefined
  };

  componentDidMount() {
    dashboardService
      .getLast12Meses()
      .then((data) => {
        this.criarChartData(data);
      })
      .catch((error) => {
        if (error && error.data) {
          messageService.errorMessage(error.data.error, error.data.message);
        }
        this.criarChartData(null);
      });
  }

  criarChartData = (data) => {
    const chartData = [['Mês', 'Valor', 'Economia', 'Valor mercado', 'Acionistas', 'Outros clientes']]
    if(data.length > 0){
      console.log('teste', data)
      data.forEach(obj => {
        chartData.push([obj["dataFormatada"], obj["totalVenda"], obj["totalDesconto"], obj["totalMercado"], obj["totalClienteAcionista"], obj["totalClienteOutros"]])
      });
      this.setState({
        chartData: chartData,
        mesSelecionado: chartData[chartData.length - 1]
      });
    }else{
      chartData.push(['11/2020',0,0,0,0,0])
      this.setState({
        chartData: chartData,
        mesSelecionado: undefined
      });
    }
  }

  render() {
    const { expandedFiltro, chartData, mesSelecionado } = this.state;
    const handleChangeExpandedFiltro = () => (event, isExpanded) => {
      this.setState({ expandedFiltro: isExpanded })
    };

    return (
      <React.Fragment>
        <Row>
          <Col>
            <Box width="100%" display="flex" flexDirection="column">
              <Grid container style={{ paddingBottom: "10px" }} spacing={1}>
                <Grid item xs={12}>
                  <Accordion expanded={expandedFiltro} onChange={handleChangeExpandedFiltro()}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="painelFiltro-content"
                      id="painelFiltro-header"
                    >
                      <Typography className={this.props.classes.heading}>Filtros</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        Filtros aqui
                </Typography>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              </Grid>
              <Grid container style={{ paddingBottom: "10px" }} spacing={1}>
                <Grid item xs={12} sm={12} md={8} lg={9}>
                  <Card className='pb-0 m-1' style={{ height: 305 }}>
                    <Card.Header className={this.props.classes.cardHeader}>
                      <Card.Title as='h5'>Faturamento</Card.Title>
                      <label className={`${this.props.classes.labelMes} label theme-bg text-white f-14 f-w-400 float-right`}>Anual</label>
                    </Card.Header>
                    <Card.Body className={this.props.classes.cardBody}>
                      <Chart
                        width={'100%'}
                        height={'240px'}
                        chartType="Bar"
                        loader={<div>Buscando informações...</div>}
                        data={chartData}
                        chartWrapperParams={{ view: { columns: [0, 3] } }}
                        options={{
                          legend: { position: 'none' },
                          // chart: {
                          //   title: 'Faturamento',
                          //   subtitle: 'Últimos 12 meses'
                          // }
                        }}
                        formatters={[
                          {
                            type: 'NumberFormat',
                            column: 3,
                            options: {
                              prefix: 'R$ ',
                              negativeColor: 'red',
                              negativeParens: true,
                            },
                          },
                        ]}
                        chartEvents={[
                          {
                            eventName: 'select',
                            callback: ({ chartWrapper }) => {
                              const chart = chartWrapper.getChart()
                              const selection = chart.getSelection()
                              if (selection.length === 1) {
                                const [selectedItem] = selection
                                const dataTable = chartWrapper.getDataTable()
                                const { row, column } = selectedItem
                                this.setState({ mesSelecionado: chartData[row + 1] })
                              }
                            },
                          },
                        ]}
                        // For tests
                        rootProps={{ 'data-testid': '2' }}
                      />
                    </Card.Body>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={3}>
                  <Grid item xs={12}>
                    <Card className='pb-0 mb-1' style={{ height: 100 }}>
                      <Card.Header className={this.props.classes.cardHeader}>
                        <Card.Title as='h5'>Total Mercado</Card.Title>
                        <label className={`${this.props.classes.labelMes} label theme-bg text-white f-14 f-w-400 float-right`}>{mesSelecionado ? mesSelecionado[0] : ""}</label>
                      </Card.Header>
                      <Card.Body className={this.props.classes.cardBody}>
                        <h3 className="f-w-500" style={{ textAlign: "center", fontSize: 28 }}>{mesSelecionado ? maskNumericValue(mesSelecionado[3], true) : ""}</h3>
                      </Card.Body>
                    </Card>
                  </Grid>
                  <Grid item xs={12}>
                    <Card className='pb-0 mb-1' style={{ height: 100 }}>
                      <Card.Header className={this.props.classes.cardHeader}>
                        <Card.Title as='h5'>Total Economia</Card.Title>
                        <label className={`${this.props.classes.labelMes} label theme-bg text-white f-14 f-w-400 float-right`}>{mesSelecionado ? mesSelecionado[0] : ""}</label>
                      </Card.Header>
                      <Card.Body className={this.props.classes.cardBody}>
                        <h3 className="f-w-500" style={{ textAlign: "center", fontSize: 28 }}>{mesSelecionado ? maskNumericValue(mesSelecionado[2], true) : ""}</h3>
                      </Card.Body>
                    </Card>
                  </Grid>
                  <Grid item xs={12}>
                    <Card className='pb-0 mb-1' style={{ height: 100 }}>
                      <Card.Header className={this.props.classes.cardHeader}>
                        <Card.Title as='h5'>Total Venda</Card.Title>
                        <label className={`${this.props.classes.labelMes} label theme-bg text-white f-14 f-w-400 float-right`}>{mesSelecionado ? mesSelecionado[0] : ""}</label>
                      </Card.Header>
                      <Card.Body className={this.props.classes.cardBody}>
                        <h3 className="f-w-500" style={{ textAlign: "center", fontSize: 28 }}>{mesSelecionado ? maskNumericValue(mesSelecionado[1], true) : ""}</h3>
                      </Card.Body>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
              {mesSelecionado && (
                <Grid container style={{ paddingBottom: "10px" }} spacing={1}>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Card className='pb-0 m-1' style={{ height: 335 }}>
                      <Card.Header className={this.props.classes.cardHeader}>
                        <Card.Title as='h5'>Clientes</Card.Title>
                        <label className={`${this.props.classes.labelMes} label theme-bg text-white f-14 f-w-400 float-right`}>{mesSelecionado ? mesSelecionado[0] : ""}</label>
                      </Card.Header>
                      <Card.Body className={this.props.classes.cardBody}>
                        <Chart
                          width={'100%'}
                          height={'100%'}
                          chartType="PieChart"
                          loader={<div>Buscando informações...</div>}
                          data={chartData}
                          data={[
                            ['', 'Valor'],
                            ['Acionistas', mesSelecionado[4]],
                            ['Outros clientes', mesSelecionado[5]],
                          ]}
                          // chartWrapperParams={{ view: { columns: [0, 1] } }}
                          options={{
                            // chart: {
                            //   title: 'Faturamento',
                            //   subtitle: 'Últimos 12 meses'
                            // }
                          }}
                          formatters={[
                            {
                              type: 'NumberFormat',
                              column: 1,
                              options: {
                                prefix: 'R$ ',
                                negativeColor: 'red',
                                negativeParens: true,
                              },
                            },
                          ]}
                          // For tests
                          rootProps={{ 'data-testid': '2' }}
                        />
                      </Card.Body></Card>
                  </Grid>
                </Grid>
              )}
            </Box>
          </Col>
        </Row>
      </React.Fragment >
    );
  }
}

const styles = {
  root: {
    width: '100%',
  },
  heading: {
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  cardHeader: {
    padding: "8px 25px !important"
  },
  cardBody: {
    padding: "15px 25px !important"
  },
  labelMes: {
    padding: "0px 10px",
    marginBottom: 0
  }
};

export default withStyles(styles)(DashboardFarmaciaView);
