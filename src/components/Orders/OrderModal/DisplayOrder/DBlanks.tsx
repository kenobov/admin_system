import React from 'react';

import TCmodel from "../../../../core/models/TC.model";
import countDyes from "../../../../core/utils/countDyes";

import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";

import {GiPapers, GiStamper} from "react-icons/gi";
import {BsPrinterFill} from "react-icons/bs";
import {FaScroll} from "react-icons/fa";
import {ImListNumbered} from "react-icons/im";
import {AiOutlineBorderHorizontal, AiOutlineHolder} from "react-icons/ai";

interface DBlanksProps {
    params: {blanks: typeof TCmodel} | null
}

const DBlanks = (props: DBlanksProps) => {

    const {blanks} = props.params ? props.params : {blanks: TCmodel};
    const {
        material,
        print,
        lamination,
        numeration,
        embossing,
        perforation,
        creasing
    } = blanks;
    const paper = material.paper.parameters ? JSON.parse(material.paper.parameters) : {};

    const paints = countDyes(print.paints);

    return (
        <Box sx={{ flexGrow: 1, margin: "30px 0 10px" }}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Paper className={`paper dark`}>
                        <Typography variant={`h6`}>
                            {material.width} x {material.height} мм
                        </Typography>
                        <span>Формат</span>
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
                <Grid item xs={4}>
                    <Paper className={`paper`}>
                        <Typography variant={`h6`}>
                            {material.density} гр
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
                            {material.xq + ' x ' + material.yq + ' = ' +
                            (material.xq * material.yq)},
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
                    lamination.fitting > 0 ?
                        <Grid item xs={3}>
                            <Paper className={`paper`}>
                                <span>Приладка</span>
                                <Typography variant={`h6`}>
                                    {lamination.fitting}
                                </Typography>
                                <span>Ламинация</span>
                            </Paper>
                        </Grid> : null
                }
                {
                    embossing.fitting > 0 ?
                        <Grid item xs={3}>
                            <Paper className={`paper`}>
                                <span>Приладка</span>
                                <Typography variant={`h6`}>
                                    {embossing.fitting}
                                </Typography>
                                <span>Тиснение</span>
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

                {
                    lamination.lamination === 'yes' ?
                        <>
                            <Grid item xs={12}>
                                <h3 className="displayTitle">
                                    <FaScroll/> Ламинация
                                </h3>
                            </Grid>
                            <Grid item xs={3}>
                                <Paper className={`paper`}>
                                        <Typography variant={`h6`}>
                                            {lamination.lamination_sides === 1 ? '1 + 0' : '1 + 1'}
                                        </Typography>
                                        <span>Стороны</span>
                                    </Paper>
                            </Grid>
                            <Grid item xs={3}>
                                <Paper className={`paper`}>
                                    <Typography variant={`h6`}>
                                        {lamination.lamination_density}
                                    </Typography>
                                    <span>Толщина</span>
                                </Paper>
                            </Grid>
                            <Grid item xs={3}>
                                <Paper className={`paper`}>
                                    <Typography variant={`h6`}>
                                        {lamination.lamination_type === 1 ? 'Глянец' : 'Мат'}
                                    </Typography>
                                    <span>Тип</span>
                                </Paper>
                            </Grid>
                            <Grid item xs={3}>
                                <Paper className={`paper`}>
                                    <Typography variant={`h6`}>
                                        {lamination.lamination_paper.quantity} &nbsp;
                                        <small>{lamination.lamination_paper.unit}</small>
                                    </Typography>
                                    <span>Количество</span>
                                </Paper>
                            </Grid>
                        </> : ''
                }

                {
                    numeration.numeration === 'yes' ?
                        <>
                            <Grid item xs={12}>
                                <h3 className="displayTitle">
                                    <ImListNumbered/> Нумерация
                                </h3>
                            </Grid>
                            <Grid item xs={3}>
                                <Paper className={`paper`}>
                                    <Typography variant={`h6`}>
                                        {numeration.numeration_start}
                                    </Typography>
                                    <span>Начало</span>
                                </Paper>
                            </Grid>
                        </> : ''
                }

                {
                    embossing.embossing === 'yes' ?
                        <>
                            <Grid item xs={12}>
                                <h3 className="displayTitle">
                                    <GiStamper/> Тиснение
                                </h3>
                            </Grid>
                            <Grid item xs={6}>
                                <Paper className={`paper`}>
                                    <Typography variant={`h6`}>
                                        {embossing.stamps.length}
                                    </Typography>
                                    <span>Количество штампов</span>
                                </Paper>
                            </Grid>
                            {
                                embossing.stamps.map((stamp:any, i:number) => {
                                    return (
                                        <Grid item xs={6} key={'stamp'+i}>
                                            <Paper className={`paper`}>
                                                <span>Штамп {stamp.id}</span>
                                                <Typography variant={`h6`}>
                                                    {stamp.width} x {stamp.height}
                                                </Typography>
                                                <span>{stamp.foil.name}</span>
                                            </Paper>
                                    </Grid>)
                                })
                            }
                        </> : ''
                }

                {
                    +creasing.creasing_quantity > 0 ?
                        <>
                            <Grid item xs={12}>
                                <h3 className="displayTitle">
                                    <AiOutlineBorderHorizontal/> Биговка
                                </h3>
                            </Grid>
                            <Grid item xs={6}>
                                <Paper className={`paper`}>
                                    <Typography variant={`h6`}>
                                        {creasing.creasing_quantity}
                                    </Typography>
                                    <span>Количество бигов</span>
                                </Paper>
                            </Grid>
                        </> : ''
                }

                {
                    +perforation.perforation_quantity > 0 ?
                        <>
                            <Grid item xs={12}>
                                <h3 className="displayTitle">
                                    <AiOutlineHolder/> Перфорация
                                </h3>
                            </Grid>
                            <Grid item xs={6}>
                                <Paper className={`paper`}>
                                    <Typography variant={`h6`}>
                                        {perforation.perforation_quantity}
                                    </Typography>
                                    <span>Количество перфораций</span>
                                </Paper>
                            </Grid>
                        </> : ''
                }

            </Grid>
        </Box>
    )

}

export default DBlanks;
