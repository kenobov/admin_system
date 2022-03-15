import React from 'react';
import TCmodel from "../../../../../core/models/TC.model";
import countDyes from "../../../../../core/utils/countDyes";

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";

import {GiPapers, GiStamper, GiCardBurn} from "react-icons/gi";
import {BsPrinterFill} from "react-icons/bs";

interface DBooksFlyleafProps {
    flyleaf: typeof TCmodel
}

const DBooksFlyleaf = (props:DBooksFlyleafProps) => {

    const {
        material,
        print
    } = props.flyleaf;

    const paper = material.paper.parameters ? JSON.parse(material.paper.parameters) : {};

    const paints = countDyes(print.paints);

    return (
        <Box sx={{ flexGrow: 1, margin: "30px 0 10px" }}>

            <h2 style={{textAlign: "center"}}>
                Обложка
            </h2>

            <Grid container spacing={2}>
                <Grid item xs={5}>
                    <Paper className={`paper`}>
                        <Typography variant={`h6`}>
                            {material.width} x {material.height}&nbsp;
                            <small className="text-muted" style={{fontSize: "16px"}}>мм</small>
                        </Typography>
                        <span>ФОРМАТ</span>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={`paper`}>
                        <Typography variant={`h6`}>
                            {material.total}
                        </Typography>
                        <span>Количество</span>
                    </Paper>
                </Grid>

                <Grid item xs={3}>
                    <Paper className={`paper`}>
                        <Typography variant={`h6`}>
                            {material.density ? material.density : 80}&nbsp;
                            <small className="text-muted" style={{fontSize: "16px"}}>
                                гр
                            </small>
                        </Typography>
                        <span>Плотность</span>
                    </Paper>
                </Grid>


                <Grid item xs={12}>
                    <h3 className="displayTitle">
                        <GiPapers/> Бумага
                    </h3>
                </Grid>

                <Grid item xs={12}>
                    <Paper className={`paper`}>
                        <span>Материал</span>
                        <Typography variant={`h6`}>
                            {material.paper.name}
                        </Typography>
                        <p style={{fontSize: "12px", margin: "5px 0"}}>
                            На листе формата {paper.width + ' x ' + paper.height} поместится &nbsp;
                            { material.xq + ' x ' + material.yq + ' = ' +
                            (material.xq * material.yq) },
                            {material.proportion === 'yes' ? ' по доле' : " не по доле"}
                        </p>
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={`paper`}>
                        <span>Количество</span>
                        <Typography variant={`h6`}>
                            {material.paper.quantity}
                        </Typography>
                        <span> ({material.paper.unit})</span>
                    </Paper>
                </Grid>
                {
                    print.fitting > 0 ?
                        <Grid item xs={3}>
                            <Paper className={`paper`}>
                                <span>Приладка</span>
                                <Typography variant={`h6`}>
                                    {print.fitting}
                                </Typography>
                                <span>Печать</span>
                            </Paper>
                        </Grid> : null
                }

                {
                    print.type !== 'none' ?
                        <>
                            <Grid item xs={12}>
                                <h3 className="displayTitle">
                                    <BsPrinterFill/> Печать
                                </h3>
                            </Grid>
                            <Grid item xs={3}>
                                <Paper className={`paper`}>
                                    <Typography variant={`h6`}>
                                        {paints.face_paints}
                                        &nbsp;+&nbsp;
                                        {paints.back_paints}
                                    </Typography>
                                    <span>Красочность</span>
                                </Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <Paper className={`paper`}>
                                    <Typography variant={`h6`}>
                                        {print.type === 'none' ? 'Без печати' : ''}
                                        {print.type === 'digital' ? 'Цифровая' : ''}
                                        {print.type === 'riso' ? 'Ризограф' : ''}
                                        {print.type === 'offset' ? 'Офсет' : ''}
                                    </Typography>
                                    <span>Тип печати</span>
                                </Paper>
                            </Grid>
                            <Grid item xs={3}>
                                <Paper className={`paper`}>
                                    <Typography variant={`h6`}>
                                        {print.inkprints}
                                    </Typography>
                                    <span>Краскооттиски</span>
                                </Paper>
                            </Grid>
                            <Grid item xs={3}>
                                <Paper className={`paper`}>
                                    <Typography variant={`h6`}>
                                        {print.complexity}
                                    </Typography>
                                    <span>Гр сложности</span>
                                </Paper>
                            </Grid>
                            {
                                print.type === 'digital' && print.machine ?
                                    <Grid item xs={6}>
                                        <Paper className={`paper`}>
                                            <Typography variant={`h6`}>
                                                {print.machine === '2060' ? 'Konica 2060' : ''}
                                                {print.machine === '258' ? 'Konica 258' : ''}
                                                {print.machine === 'xerox' ? 'Xerox' : ''}
                                                {print.machine === '405' ? 'Canon GP405' : ''}
                                            </Typography>
                                            <span>Принтер</span>
                                        </Paper>
                                    </Grid> : ''
                            }
                            {
                                print.type === 'offset' && print.plates ?
                                    <Grid item xs={3}>
                                        <Paper className={`paper`}>
                                            <Typography variant={`h6`}>
                                                {print.plates}
                                            </Typography>
                                            <span>Пластины</span>
                                        </Paper>
                                    </Grid> : ''
                            }

                        </> : ''
                }

            </Grid>

        </Box>
    )

}

export default DBooksFlyleaf;