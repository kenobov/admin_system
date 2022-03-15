function countDyes(paints:any) {

    let face_paints = 0, back_paints = 0;
    Object.entries(paints.face).forEach((item) => {
        if(item[1] && item[0] !== 'pantone') face_paints++
    });
    face_paints += paints.face.pantone.length;
    Object.entries(paints.back).forEach(item => {
        if(item[1] && item[0] !== 'pantone') back_paints++
    });
    back_paints += paints.back.pantone.length;

    return {
        face_paints, back_paints
    }
}

export default countDyes;