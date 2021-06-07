.class public La/e/a/a/a;
.super Ljava/lang/Object;
.source ""


# direct methods
.method private static a(La/e/a/a/h;)I
    .locals 2

    invoke-virtual {p0}, La/e/a/a/h;->j()La/e/a/a/h$a;

    move-result-object v0

    sget-object v1, La/e/a/a/h$a;->c:La/e/a/a/h$a;

    if-ne v0, v1, :cond_1

    iget v0, p0, La/e/a/a/h;->K:I

    if-nez v0, :cond_0

    invoke-virtual {p0}, La/e/a/a/h;->i()I

    move-result v0

    int-to-float v0, v0

    iget v1, p0, La/e/a/a/h;->J:F

    mul-float/2addr v0, v1

    goto :goto_0

    :cond_0
    invoke-virtual {p0}, La/e/a/a/h;->i()I

    move-result v0

    int-to-float v0, v0

    iget v1, p0, La/e/a/a/h;->J:F

    div-float/2addr v0, v1

    :goto_0
    float-to-int v0, v0

    invoke-virtual {p0, v0}, La/e/a/a/h;->o(I)V

    goto :goto_2

    :cond_1
    invoke-virtual {p0}, La/e/a/a/h;->q()La/e/a/a/h$a;

    move-result-object v0

    sget-object v1, La/e/a/a/h$a;->c:La/e/a/a/h$a;

    if-ne v0, v1, :cond_3

    iget v0, p0, La/e/a/a/h;->K:I

    const/4 v1, 0x1

    if-ne v0, v1, :cond_2

    invoke-virtual {p0}, La/e/a/a/h;->s()I

    move-result v0

    int-to-float v0, v0

    iget v1, p0, La/e/a/a/h;->J:F

    mul-float/2addr v0, v1

    goto :goto_1

    :cond_2
    invoke-virtual {p0}, La/e/a/a/h;->s()I

    move-result v0

    int-to-float v0, v0

    iget v1, p0, La/e/a/a/h;->J:F

    div-float/2addr v0, v1

    :goto_1
    float-to-int v0, v0

    invoke-virtual {p0, v0}, La/e/a/a/h;->g(I)V

    goto :goto_2

    :cond_3
    const/4 v0, -0x1

    :goto_2
    return v0
.end method

.method private static a(La/e/a/a/h;I)I
    .locals 4

    mul-int/lit8 v0, p1, 0x2

    iget-object v1, p0, La/e/a/a/h;->D:[La/e/a/a/f;

    aget-object v2, v1, v0

    add-int/lit8 v0, v0, 0x1

    aget-object v0, v1, v0

    iget-object v1, v2, La/e/a/a/f;->d:La/e/a/a/f;

    if-eqz v1, :cond_1

    iget-object v1, v1, La/e/a/a/f;->b:La/e/a/a/h;

    iget-object v3, p0, La/e/a/a/h;->G:La/e/a/a/h;

    if-ne v1, v3, :cond_1

    iget-object v1, v0, La/e/a/a/f;->d:La/e/a/a/f;

    if-eqz v1, :cond_1

    iget-object v1, v1, La/e/a/a/f;->b:La/e/a/a/h;

    if-ne v1, v3, :cond_1

    invoke-virtual {v3, p1}, La/e/a/a/h;->d(I)I

    move-result v1

    if-nez p1, :cond_0

    iget v3, p0, La/e/a/a/h;->aa:F

    goto :goto_0

    :cond_0
    iget v3, p0, La/e/a/a/h;->ba:F

    :goto_0
    invoke-virtual {p0, p1}, La/e/a/a/h;->d(I)I

    move-result p0

    invoke-virtual {v2}, La/e/a/a/f;->b()I

    move-result p1

    sub-int/2addr v1, p1

    invoke-virtual {v0}, La/e/a/a/f;->b()I

    move-result p1

    sub-int/2addr v1, p1

    sub-int/2addr v1, p0

    int-to-float p0, v1

    mul-float/2addr p0, v3

    float-to-int p0, p0

    return p0

    :cond_1
    const/4 p0, 0x0

    return p0
.end method

.method private static a(La/e/a/a/h;IZI)I
    .locals 20

    move-object/from16 v0, p0

    move/from16 v1, p1

    move/from16 v2, p2

    iget-boolean v3, v0, La/e/a/a/h;->ja:Z

    const/4 v4, 0x0

    if-nez v3, :cond_0

    return v4

    :cond_0
    iget-object v3, v0, La/e/a/a/h;->z:La/e/a/a/f;

    iget-object v3, v3, La/e/a/a/f;->d:La/e/a/a/f;

    const/4 v5, 0x1

    if-eqz v3, :cond_1

    if-ne v1, v5, :cond_1

    move v3, v5

    goto :goto_0

    :cond_1
    move v3, v4

    :goto_0
    if-eqz v2, :cond_2

    invoke-virtual/range {p0 .. p0}, La/e/a/a/h;->c()I

    move-result v6

    invoke-virtual/range {p0 .. p0}, La/e/a/a/h;->i()I

    move-result v7

    invoke-virtual/range {p0 .. p0}, La/e/a/a/h;->c()I

    move-result v8

    sub-int/2addr v7, v8

    mul-int/lit8 v8, v1, 0x2

    add-int/lit8 v9, v8, 0x1

    goto :goto_1

    :cond_2
    invoke-virtual/range {p0 .. p0}, La/e/a/a/h;->i()I

    move-result v6

    invoke-virtual/range {p0 .. p0}, La/e/a/a/h;->c()I

    move-result v7

    sub-int/2addr v6, v7

    invoke-virtual/range {p0 .. p0}, La/e/a/a/h;->c()I

    move-result v7

    mul-int/lit8 v9, v1, 0x2

    add-int/lit8 v8, v9, 0x1

    :goto_1
    iget-object v10, v0, La/e/a/a/h;->D:[La/e/a/a/f;

    aget-object v11, v10, v9

    iget-object v11, v11, La/e/a/a/f;->d:La/e/a/a/f;

    if-eqz v11, :cond_3

    aget-object v10, v10, v8

    iget-object v10, v10, La/e/a/a/f;->d:La/e/a/a/f;

    if-nez v10, :cond_3

    move v10, v8

    move v8, v9

    const/4 v9, -0x1

    goto :goto_2

    :cond_3
    move v10, v9

    move v9, v5

    :goto_2
    if-eqz v3, :cond_4

    sub-int v11, p3, v6

    goto :goto_3

    :cond_4
    move/from16 v11, p3

    :goto_3
    iget-object v13, v0, La/e/a/a/h;->D:[La/e/a/a/f;

    aget-object v13, v13, v8

    invoke-virtual {v13}, La/e/a/a/f;->b()I

    move-result v13

    mul-int/2addr v13, v9

    invoke-static/range {p0 .. p1}, La/e/a/a/a;->a(La/e/a/a/h;I)I

    move-result v14

    add-int/2addr v13, v14

    add-int/2addr v11, v13

    if-nez v1, :cond_5

    invoke-virtual/range {p0 .. p0}, La/e/a/a/h;->s()I

    move-result v14

    goto :goto_4

    :cond_5
    invoke-virtual/range {p0 .. p0}, La/e/a/a/h;->i()I

    move-result v14

    :goto_4
    mul-int/2addr v14, v9

    iget-object v15, v0, La/e/a/a/h;->D:[La/e/a/a/f;

    aget-object v15, v15, v8

    invoke-virtual {v15}, La/e/a/a/f;->d()La/e/a/a/p;

    move-result-object v15

    iget-object v15, v15, La/e/a/a/r;->a:Ljava/util/HashSet;

    invoke-virtual {v15}, Ljava/util/HashSet;->iterator()Ljava/util/Iterator;

    move-result-object v15

    :goto_5
    invoke-interface {v15}, Ljava/util/Iterator;->hasNext()Z

    move-result v17

    if-eqz v17, :cond_6

    invoke-interface {v15}, Ljava/util/Iterator;->next()Ljava/lang/Object;

    move-result-object v17

    move-object/from16 v12, v17

    check-cast v12, La/e/a/a/p;

    iget-object v12, v12, La/e/a/a/p;->c:La/e/a/a/f;

    iget-object v12, v12, La/e/a/a/f;->b:La/e/a/a/h;

    invoke-static {v12, v1, v2, v11}, La/e/a/a/a;->a(La/e/a/a/h;IZI)I

    move-result v12

    invoke-static {v4, v12}, Ljava/lang/Math;->max(II)I

    move-result v4

    goto :goto_5

    :cond_6
    iget-object v12, v0, La/e/a/a/h;->D:[La/e/a/a/f;

    aget-object v12, v12, v10

    invoke-virtual {v12}, La/e/a/a/f;->d()La/e/a/a/p;

    move-result-object v12

    iget-object v12, v12, La/e/a/a/r;->a:Ljava/util/HashSet;

    invoke-virtual {v12}, Ljava/util/HashSet;->iterator()Ljava/util/Iterator;

    move-result-object v12

    const/4 v15, 0x0

    :goto_6
    invoke-interface {v12}, Ljava/util/Iterator;->hasNext()Z

    move-result v17

    if-eqz v17, :cond_7

    invoke-interface {v12}, Ljava/util/Iterator;->next()Ljava/lang/Object;

    move-result-object v17

    move-object/from16 v5, v17

    check-cast v5, La/e/a/a/p;

    iget-object v5, v5, La/e/a/a/p;->c:La/e/a/a/f;

    iget-object v5, v5, La/e/a/a/f;->b:La/e/a/a/h;

    move-object/from16 p3, v12

    add-int v12, v14, v11

    invoke-static {v5, v1, v2, v12}, La/e/a/a/a;->a(La/e/a/a/h;IZI)I

    move-result v5

    invoke-static {v15, v5}, Ljava/lang/Math;->max(II)I

    move-result v15

    move-object/from16 v12, p3

    const/4 v5, 0x1

    goto :goto_6

    :cond_7
    if-eqz v3, :cond_8

    sub-int/2addr v4, v6

    add-int/2addr v15, v7

    :goto_7
    const/4 v5, 0x1

    goto :goto_9

    :cond_8
    if-nez v1, :cond_9

    invoke-virtual/range {p0 .. p0}, La/e/a/a/h;->s()I

    move-result v5

    goto :goto_8

    :cond_9
    invoke-virtual/range {p0 .. p0}, La/e/a/a/h;->i()I

    move-result v5

    :goto_8
    mul-int/2addr v5, v9

    add-int/2addr v15, v5

    goto :goto_7

    :goto_9
    if-ne v1, v5, :cond_e

    iget-object v12, v0, La/e/a/a/h;->z:La/e/a/a/f;

    invoke-virtual {v12}, La/e/a/a/f;->d()La/e/a/a/p;

    move-result-object v12

    iget-object v12, v12, La/e/a/a/r;->a:Ljava/util/HashSet;

    invoke-virtual {v12}, Ljava/util/HashSet;->iterator()Ljava/util/Iterator;

    move-result-object v12

    const/16 v18, 0x0

    :goto_a
    invoke-interface {v12}, Ljava/util/Iterator;->hasNext()Z

    move-result v16

    if-eqz v16, :cond_b

    invoke-interface {v12}, Ljava/util/Iterator;->next()Ljava/lang/Object;

    move-result-object v16

    move-object/from16 p3, v12

    move-object/from16 v12, v16

    check-cast v12, La/e/a/a/p;

    if-ne v9, v5, :cond_a

    iget-object v5, v12, La/e/a/a/p;->c:La/e/a/a/f;

    iget-object v5, v5, La/e/a/a/f;->b:La/e/a/a/h;

    add-int v12, v6, v11

    invoke-static {v5, v1, v2, v12}, La/e/a/a/a;->a(La/e/a/a/h;IZI)I

    move-result v5

    move/from16 v12, v18

    invoke-static {v12, v5}, Ljava/lang/Math;->max(II)I

    move-result v5

    move/from16 v18, v5

    move/from16 v17, v10

    goto :goto_b

    :cond_a
    move/from16 v5, v18

    iget-object v12, v12, La/e/a/a/p;->c:La/e/a/a/f;

    iget-object v12, v12, La/e/a/a/f;->b:La/e/a/a/h;

    mul-int v16, v7, v9

    move/from16 v17, v10

    add-int v10, v16, v11

    invoke-static {v12, v1, v2, v10}, La/e/a/a/a;->a(La/e/a/a/h;IZI)I

    move-result v10

    invoke-static {v5, v10}, Ljava/lang/Math;->max(II)I

    move-result v5

    move/from16 v18, v5

    :goto_b
    move-object/from16 v12, p3

    move/from16 v10, v17

    const/4 v5, 0x1

    goto :goto_a

    :cond_b
    move/from16 v17, v10

    move/from16 v5, v18

    iget-object v10, v0, La/e/a/a/h;->z:La/e/a/a/f;

    invoke-virtual {v10}, La/e/a/a/f;->d()La/e/a/a/p;

    move-result-object v10

    iget-object v10, v10, La/e/a/a/r;->a:Ljava/util/HashSet;

    invoke-virtual {v10}, Ljava/util/HashSet;->size()I

    move-result v10

    if-lez v10, :cond_d

    if-nez v3, :cond_d

    const/4 v3, 0x1

    if-ne v9, v3, :cond_c

    add-int v3, v5, v6

    goto :goto_c

    :cond_c
    sub-int v3, v5, v7

    goto :goto_c

    :cond_d
    move v3, v5

    goto :goto_c

    :cond_e
    move/from16 v17, v10

    const/4 v3, 0x0

    :goto_c
    invoke-static {v15, v3}, Ljava/lang/Math;->max(II)I

    move-result v3

    invoke-static {v4, v3}, Ljava/lang/Math;->max(II)I

    move-result v3

    add-int/2addr v13, v3

    add-int v3, v11, v14

    const/4 v4, -0x1

    if-ne v9, v4, :cond_f

    goto :goto_d

    :cond_f
    move/from16 v19, v11

    move v11, v3

    move/from16 v3, v19

    :goto_d
    if-eqz v2, :cond_10

    invoke-static {v0, v1, v3}, La/e/a/a/n;->a(La/e/a/a/h;II)V

    invoke-virtual {v0, v3, v11, v1}, La/e/a/a/h;->a(III)V

    goto :goto_e

    :cond_10
    iget-object v2, v0, La/e/a/a/h;->s:La/e/a/a/j;

    invoke-virtual {v2, v0, v1}, La/e/a/a/j;->a(La/e/a/a/h;I)V

    invoke-virtual {v0, v3, v1}, La/e/a/a/h;->d(II)V

    :goto_e
    invoke-virtual/range {p0 .. p1}, La/e/a/a/h;->c(I)La/e/a/a/h$a;

    move-result-object v2

    sget-object v3, La/e/a/a/h$a;->c:La/e/a/a/h$a;

    if-ne v2, v3, :cond_11

    iget v2, v0, La/e/a/a/h;->J:F

    const/4 v3, 0x0

    cmpl-float v2, v2, v3

    if-eqz v2, :cond_11

    iget-object v2, v0, La/e/a/a/h;->s:La/e/a/a/j;

    invoke-virtual {v2, v0, v1}, La/e/a/a/j;->a(La/e/a/a/h;I)V

    :cond_11
    iget-object v2, v0, La/e/a/a/h;->D:[La/e/a/a/f;

    aget-object v3, v2, v8

    iget-object v3, v3, La/e/a/a/f;->d:La/e/a/a/f;

    if-eqz v3, :cond_12

    aget-object v2, v2, v17

    iget-object v2, v2, La/e/a/a/f;->d:La/e/a/a/f;

    if-eqz v2, :cond_12

    invoke-virtual/range {p0 .. p0}, La/e/a/a/h;->k()La/e/a/a/h;

    move-result-object v2

    iget-object v3, v0, La/e/a/a/h;->D:[La/e/a/a/f;

    aget-object v4, v3, v8

    iget-object v4, v4, La/e/a/a/f;->d:La/e/a/a/f;

    iget-object v4, v4, La/e/a/a/f;->b:La/e/a/a/h;

    if-ne v4, v2, :cond_12

    aget-object v3, v3, v17

    iget-object v3, v3, La/e/a/a/f;->d:La/e/a/a/f;

    iget-object v3, v3, La/e/a/a/f;->b:La/e/a/a/h;

    if-ne v3, v2, :cond_12

    iget-object v2, v0, La/e/a/a/h;->s:La/e/a/a/j;

    invoke-virtual {v2, v0, v1}, La/e/a/a/j;->a(La/e/a/a/h;I)V

    :cond_12
    return v13
.end method

.method private static a(La/e/a/a/j;I)I
    .locals 10

    mul-int/lit8 v0, p1, 0x2

    invoke-virtual {p0, p1}, La/e/a/a/j;->a(I)Ljava/util/List;

    move-result-object v1

    invoke-interface {v1}, Ljava/util/List;->size()I

    move-result v2

    const/4 v3, 0x0

    move v4, v3

    move v5, v4

    :goto_0
    if-ge v4, v2, :cond_2

    invoke-interface {v1, v4}, Ljava/util/List;->get(I)Ljava/lang/Object;

    move-result-object v6

    check-cast v6, La/e/a/a/h;

    iget-object v7, v6, La/e/a/a/h;->D:[La/e/a/a/f;

    add-int/lit8 v8, v0, 0x1

    aget-object v9, v7, v8

    iget-object v9, v9, La/e/a/a/f;->d:La/e/a/a/f;

    if-eqz v9, :cond_1

    aget-object v9, v7, v0

    iget-object v9, v9, La/e/a/a/f;->d:La/e/a/a/f;

    if-eqz v9, :cond_0

    aget-object v7, v7, v8

    iget-object v7, v7, La/e/a/a/f;->d:La/e/a/a/f;

    if-eqz v7, :cond_0

    goto :goto_1

    :cond_0
    move v7, v3

    goto :goto_2

    :cond_1
    :goto_1
    const/4 v7, 0x1

    :goto_2
    invoke-static {v6, p1, v7, v3}, La/e/a/a/a;->a(La/e/a/a/h;IZI)I

    move-result v6

    invoke-static {v5, v6}, Ljava/lang/Math;->max(II)I

    move-result v5

    add-int/lit8 v4, v4, 0x1

    goto :goto_0

    :cond_2
    iget-object p0, p0, La/e/a/a/j;->e:[I

    aput v5, p0, p1

    return v5
.end method

.method private static a(La/e/a/a/f;)V
    .locals 3

    invoke-virtual {p0}, La/e/a/a/f;->d()La/e/a/a/p;

    move-result-object v0

    iget-object v1, p0, La/e/a/a/f;->d:La/e/a/a/f;

    if-eqz v1, :cond_0

    iget-object v2, v1, La/e/a/a/f;->d:La/e/a/a/f;

    if-eq v2, p0, :cond_0

    invoke-virtual {v1}, La/e/a/a/f;->d()La/e/a/a/p;

    move-result-object p0

    invoke-virtual {p0, v0}, La/e/a/a/r;->a(La/e/a/a/r;)V

    :cond_0
    return-void
.end method

.method private static a(La/e/a/a/h;II)V
    .locals 6

    mul-int/lit8 v0, p1, 0x2

    iget-object v1, p0, La/e/a/a/h;->D:[La/e/a/a/f;

    aget-object v2, v1, v0

    add-int/lit8 v3, v0, 0x1

    aget-object v1, v1, v3

    iget-object v3, v2, La/e/a/a/f;->d:La/e/a/a/f;

    const/4 v4, 0x1

    if-eqz v3, :cond_0

    iget-object v3, v1, La/e/a/a/f;->d:La/e/a/a/f;

    if-eqz v3, :cond_0

    move v3, v4

    goto :goto_0

    :cond_0
    const/4 v3, 0x0

    :goto_0
    if-eqz v3, :cond_1

    invoke-static {p0, p1}, La/e/a/a/a;->a(La/e/a/a/h;I)I

    move-result p2

    invoke-virtual {v2}, La/e/a/a/f;->b()I

    move-result v0

    add-int/2addr p2, v0

    invoke-static {p0, p1, p2}, La/e/a/a/n;->a(La/e/a/a/h;II)V

    return-void

    :cond_1
    iget v3, p0, La/e/a/a/h;->J:F

    const/4 v5, 0x0

    cmpl-float v3, v3, v5

    if-eqz v3, :cond_2

    invoke-virtual {p0, p1}, La/e/a/a/h;->c(I)La/e/a/a/h$a;

    move-result-object v3

    sget-object v5, La/e/a/a/h$a;->c:La/e/a/a/h$a;

    if-ne v3, v5, :cond_2

    invoke-static {p0}, La/e/a/a/a;->a(La/e/a/a/h;)I

    move-result p2

    iget-object v3, p0, La/e/a/a/h;->D:[La/e/a/a/f;

    aget-object v0, v3, v0

    invoke-virtual {v0}, La/e/a/a/f;->d()La/e/a/a/p;

    move-result-object v0

    iget v0, v0, La/e/a/a/p;->h:F

    float-to-int v0, v0

    add-int v3, v0, p2

    invoke-virtual {v1}, La/e/a/a/f;->d()La/e/a/a/p;

    move-result-object v5

    invoke-virtual {v2}, La/e/a/a/f;->d()La/e/a/a/p;

    move-result-object v2

    iput-object v2, v5, La/e/a/a/p;->g:La/e/a/a/p;

    invoke-virtual {v1}, La/e/a/a/f;->d()La/e/a/a/p;

    move-result-object v2

    int-to-float p2, p2

    iput p2, v2, La/e/a/a/p;->h:F

    invoke-virtual {v1}, La/e/a/a/f;->d()La/e/a/a/p;

    move-result-object p2

    iput v4, p2, La/e/a/a/r;->b:I

    invoke-virtual {p0, v0, v3, p1}, La/e/a/a/h;->a(III)V

    return-void

    :cond_2
    invoke-virtual {p0, p1}, La/e/a/a/h;->e(I)I

    move-result v0

    sub-int/2addr p2, v0

    invoke-virtual {p0, p1}, La/e/a/a/h;->d(I)I

    move-result v0

    sub-int v0, p2, v0

    invoke-virtual {p0, v0, p2, p1}, La/e/a/a/h;->a(III)V

    invoke-static {p0, p1, v0}, La/e/a/a/n;->a(La/e/a/a/h;II)V

    return-void
.end method

.method public static a(La/e/a/a/i;)V
    .locals 10

    invoke-virtual {p0}, La/e/a/a/i;->M()I

    move-result v0

    const/16 v1, 0x20

    and-int/2addr v0, v1

    if-eq v0, v1, :cond_0

    invoke-static {p0}, La/e/a/a/a;->b(La/e/a/a/i;)V

    return-void

    :cond_0
    const/4 v0, 0x1

    iput-boolean v0, p0, La/e/a/a/i;->Oa:Z

    const/4 v1, 0x0

    iput-boolean v1, p0, La/e/a/a/i;->Ia:Z

    iput-boolean v1, p0, La/e/a/a/i;->Ja:Z

    iput-boolean v1, p0, La/e/a/a/i;->Ka:Z

    iget-object v2, p0, La/e/a/a/t;->va:Ljava/util/ArrayList;

    iget-object v3, p0, La/e/a/a/i;->Ha:Ljava/util/List;

    invoke-virtual {p0}, La/e/a/a/h;->j()La/e/a/a/h$a;

    move-result-object v4

    sget-object v5, La/e/a/a/h$a;->b:La/e/a/a/h$a;

    if-ne v4, v5, :cond_1

    move v4, v0

    goto :goto_0

    :cond_1
    move v4, v1

    :goto_0
    invoke-virtual {p0}, La/e/a/a/h;->q()La/e/a/a/h$a;

    move-result-object v5

    sget-object v6, La/e/a/a/h$a;->b:La/e/a/a/h$a;

    if-ne v5, v6, :cond_2

    move v5, v0

    goto :goto_1

    :cond_2
    move v5, v1

    :goto_1
    if-nez v4, :cond_4

    if-eqz v5, :cond_3

    goto :goto_2

    :cond_3
    move v6, v1

    goto :goto_3

    :cond_4
    :goto_2
    move v6, v0

    :goto_3
    invoke-interface {v3}, Ljava/util/List;->clear()V

    invoke-interface {v2}, Ljava/util/List;->iterator()Ljava/util/Iterator;

    move-result-object v7

    :goto_4
    invoke-interface {v7}, Ljava/util/Iterator;->hasNext()Z

    move-result v8

    if-eqz v8, :cond_5

    invoke-interface {v7}, Ljava/util/Iterator;->next()Ljava/lang/Object;

    move-result-object v8

    check-cast v8, La/e/a/a/h;

    const/4 v9, 0x0

    iput-object v9, v8, La/e/a/a/h;->s:La/e/a/a/j;

    iput-boolean v1, v8, La/e/a/a/h;->la:Z

    invoke-virtual {v8}, La/e/a/a/h;->F()V

    goto :goto_4

    :cond_5
    invoke-interface {v2}, Ljava/util/List;->iterator()Ljava/util/Iterator;

    move-result-object v2

    :cond_6
    invoke-interface {v2}, Ljava/util/Iterator;->hasNext()Z

    move-result v7

    if-eqz v7, :cond_7

    invoke-interface {v2}, Ljava/util/Iterator;->next()Ljava/lang/Object;

    move-result-object v7

    check-cast v7, La/e/a/a/h;

    iget-object v8, v7, La/e/a/a/h;->s:La/e/a/a/j;

    if-nez v8, :cond_6

    invoke-static {v7, v3, v6}, La/e/a/a/a;->a(La/e/a/a/h;Ljava/util/List;Z)Z

    move-result v7

    if-nez v7, :cond_6

    invoke-static {p0}, La/e/a/a/a;->b(La/e/a/a/i;)V

    iput-boolean v1, p0, La/e/a/a/i;->Oa:Z

    return-void

    :cond_7
    invoke-interface {v3}, Ljava/util/List;->iterator()Ljava/util/Iterator;

    move-result-object v2

    move v6, v1

    move v7, v6

    :goto_5
    invoke-interface {v2}, Ljava/util/Iterator;->hasNext()Z

    move-result v8

    if-eqz v8, :cond_8

    invoke-interface {v2}, Ljava/util/Iterator;->next()Ljava/lang/Object;

    move-result-object v8

    check-cast v8, La/e/a/a/j;

    invoke-static {v8, v1}, La/e/a/a/a;->a(La/e/a/a/j;I)I

    move-result v9

    invoke-static {v6, v9}, Ljava/lang/Math;->max(II)I

    move-result v6

    invoke-static {v8, v0}, La/e/a/a/a;->a(La/e/a/a/j;I)I

    move-result v8

    invoke-static {v7, v8}, Ljava/lang/Math;->max(II)I

    move-result v7

    goto :goto_5

    :cond_8
    if-eqz v4, :cond_9

    sget-object v2, La/e/a/a/h$a;->a:La/e/a/a/h$a;

    invoke-virtual {p0, v2}, La/e/a/a/h;->a(La/e/a/a/h$a;)V

    invoke-virtual {p0, v6}, La/e/a/a/h;->o(I)V

    iput-boolean v0, p0, La/e/a/a/i;->Ia:Z

    iput-boolean v0, p0, La/e/a/a/i;->Ja:Z

    iput v6, p0, La/e/a/a/i;->La:I

    :cond_9
    if-eqz v5, :cond_a

    sget-object v2, La/e/a/a/h$a;->a:La/e/a/a/h$a;

    invoke-virtual {p0, v2}, La/e/a/a/h;->b(La/e/a/a/h$a;)V

    invoke-virtual {p0, v7}, La/e/a/a/h;->g(I)V

    iput-boolean v0, p0, La/e/a/a/i;->Ia:Z

    iput-boolean v0, p0, La/e/a/a/i;->Ka:Z

    iput v7, p0, La/e/a/a/i;->Ma:I

    :cond_a
    invoke-virtual {p0}, La/e/a/a/h;->s()I

    move-result v2

    invoke-static {v3, v1, v2}, La/e/a/a/a;->a(Ljava/util/List;II)V

    invoke-virtual {p0}, La/e/a/a/h;->i()I

    move-result p0

    invoke-static {v3, v0, p0}, La/e/a/a/a;->a(Ljava/util/List;II)V

    return-void
.end method

.method private static a(La/e/a/a/i;La/e/a/a/h;La/e/a/a/j;)V
    .locals 1

    const/4 v0, 0x0

    iput-boolean v0, p2, La/e/a/a/j;->d:Z

    iput-boolean v0, p0, La/e/a/a/i;->Oa:Z

    iput-boolean v0, p1, La/e/a/a/h;->ja:Z

    return-void
.end method

.method public static a(Ljava/util/List;II)V
    .locals 5
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "(",
            "Ljava/util/List<",
            "La/e/a/a/j;",
            ">;II)V"
        }
    .end annotation

    invoke-interface {p0}, Ljava/util/List;->size()I

    move-result v0

    const/4 v1, 0x0

    :goto_0
    if-ge v1, v0, :cond_2

    invoke-interface {p0, v1}, Ljava/util/List;->get(I)Ljava/lang/Object;

    move-result-object v2

    check-cast v2, La/e/a/a/j;

    invoke-virtual {v2, p1}, La/e/a/a/j;->b(I)Ljava/util/Set;

    move-result-object v2

    invoke-interface {v2}, Ljava/util/Set;->iterator()Ljava/util/Iterator;

    move-result-object v2

    :cond_0
    :goto_1
    invoke-interface {v2}, Ljava/util/Iterator;->hasNext()Z

    move-result v3

    if-eqz v3, :cond_1

    invoke-interface {v2}, Ljava/util/Iterator;->next()Ljava/lang/Object;

    move-result-object v3

    check-cast v3, La/e/a/a/h;

    iget-boolean v4, v3, La/e/a/a/h;->ja:Z

    if-eqz v4, :cond_0

    invoke-static {v3, p1, p2}, La/e/a/a/a;->a(La/e/a/a/h;II)V

    goto :goto_1

    :cond_1
    add-int/lit8 v1, v1, 0x1

    goto :goto_0

    :cond_2
    return-void
.end method

.method private static a(La/e/a/a/h;La/e/a/a/j;Ljava/util/List;Z)Z
    .locals 8
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "(",
            "La/e/a/a/h;",
            "La/e/a/a/j;",
            "Ljava/util/List<",
            "La/e/a/a/j;",
            ">;Z)Z"
        }
    .end annotation

    const/4 v0, 0x1

    if-nez p0, :cond_0

    return v0

    :cond_0
    const/4 v1, 0x0

    iput-boolean v1, p0, La/e/a/a/h;->ka:Z

    invoke-virtual {p0}, La/e/a/a/h;->k()La/e/a/a/h;

    move-result-object v2

    check-cast v2, La/e/a/a/i;

    iget-object v3, p0, La/e/a/a/h;->s:La/e/a/a/j;

    if-nez v3, :cond_1e

    iput-boolean v0, p0, La/e/a/a/h;->ja:Z

    iget-object v3, p1, La/e/a/a/j;->a:Ljava/util/List;

    invoke-interface {v3, p0}, Ljava/util/List;->add(Ljava/lang/Object;)Z

    iput-object p1, p0, La/e/a/a/h;->s:La/e/a/a/j;

    iget-object v3, p0, La/e/a/a/h;->v:La/e/a/a/f;

    iget-object v3, v3, La/e/a/a/f;->d:La/e/a/a/f;

    if-nez v3, :cond_1

    iget-object v3, p0, La/e/a/a/h;->x:La/e/a/a/f;

    iget-object v3, v3, La/e/a/a/f;->d:La/e/a/a/f;

    if-nez v3, :cond_1

    iget-object v3, p0, La/e/a/a/h;->w:La/e/a/a/f;

    iget-object v3, v3, La/e/a/a/f;->d:La/e/a/a/f;

    if-nez v3, :cond_1

    iget-object v3, p0, La/e/a/a/h;->y:La/e/a/a/f;

    iget-object v3, v3, La/e/a/a/f;->d:La/e/a/a/f;

    if-nez v3, :cond_1

    iget-object v3, p0, La/e/a/a/h;->z:La/e/a/a/f;

    iget-object v3, v3, La/e/a/a/f;->d:La/e/a/a/f;

    if-nez v3, :cond_1

    iget-object v3, p0, La/e/a/a/h;->C:La/e/a/a/f;

    iget-object v3, v3, La/e/a/a/f;->d:La/e/a/a/f;

    if-nez v3, :cond_1

    invoke-static {v2, p0, p1}, La/e/a/a/a;->a(La/e/a/a/i;La/e/a/a/h;La/e/a/a/j;)V

    if-eqz p3, :cond_1

    return v1

    :cond_1
    iget-object v3, p0, La/e/a/a/h;->w:La/e/a/a/f;

    iget-object v3, v3, La/e/a/a/f;->d:La/e/a/a/f;

    if-eqz v3, :cond_4

    iget-object v3, p0, La/e/a/a/h;->y:La/e/a/a/f;

    iget-object v3, v3, La/e/a/a/f;->d:La/e/a/a/f;

    if-eqz v3, :cond_4

    invoke-virtual {v2}, La/e/a/a/h;->q()La/e/a/a/h$a;

    move-result-object v3

    sget-object v4, La/e/a/a/h$a;->b:La/e/a/a/h$a;

    if-eqz p3, :cond_2

    invoke-static {v2, p0, p1}, La/e/a/a/a;->a(La/e/a/a/i;La/e/a/a/h;La/e/a/a/j;)V

    return v1

    :cond_2
    iget-object v3, p0, La/e/a/a/h;->w:La/e/a/a/f;

    iget-object v3, v3, La/e/a/a/f;->d:La/e/a/a/f;

    iget-object v3, v3, La/e/a/a/f;->b:La/e/a/a/h;

    invoke-virtual {p0}, La/e/a/a/h;->k()La/e/a/a/h;

    move-result-object v4

    if-ne v3, v4, :cond_3

    iget-object v3, p0, La/e/a/a/h;->y:La/e/a/a/f;

    iget-object v3, v3, La/e/a/a/f;->d:La/e/a/a/f;

    iget-object v3, v3, La/e/a/a/f;->b:La/e/a/a/h;

    invoke-virtual {p0}, La/e/a/a/h;->k()La/e/a/a/h;

    move-result-object v4

    if-eq v3, v4, :cond_4

    :cond_3
    invoke-static {v2, p0, p1}, La/e/a/a/a;->a(La/e/a/a/i;La/e/a/a/h;La/e/a/a/j;)V

    :cond_4
    iget-object v3, p0, La/e/a/a/h;->v:La/e/a/a/f;

    iget-object v3, v3, La/e/a/a/f;->d:La/e/a/a/f;

    if-eqz v3, :cond_7

    iget-object v3, p0, La/e/a/a/h;->x:La/e/a/a/f;

    iget-object v3, v3, La/e/a/a/f;->d:La/e/a/a/f;

    if-eqz v3, :cond_7

    invoke-virtual {v2}, La/e/a/a/h;->j()La/e/a/a/h$a;

    move-result-object v3

    sget-object v4, La/e/a/a/h$a;->b:La/e/a/a/h$a;

    if-eqz p3, :cond_5

    invoke-static {v2, p0, p1}, La/e/a/a/a;->a(La/e/a/a/i;La/e/a/a/h;La/e/a/a/j;)V

    return v1

    :cond_5
    iget-object v3, p0, La/e/a/a/h;->v:La/e/a/a/f;

    iget-object v3, v3, La/e/a/a/f;->d:La/e/a/a/f;

    iget-object v3, v3, La/e/a/a/f;->b:La/e/a/a/h;

    invoke-virtual {p0}, La/e/a/a/h;->k()La/e/a/a/h;

    move-result-object v4

    if-ne v3, v4, :cond_6

    iget-object v3, p0, La/e/a/a/h;->x:La/e/a/a/f;

    iget-object v3, v3, La/e/a/a/f;->d:La/e/a/a/f;

    iget-object v3, v3, La/e/a/a/f;->b:La/e/a/a/h;

    invoke-virtual {p0}, La/e/a/a/h;->k()La/e/a/a/h;

    move-result-object v4

    if-eq v3, v4, :cond_7

    :cond_6
    invoke-static {v2, p0, p1}, La/e/a/a/a;->a(La/e/a/a/i;La/e/a/a/h;La/e/a/a/j;)V

    :cond_7
    invoke-virtual {p0}, La/e/a/a/h;->j()La/e/a/a/h$a;

    move-result-object v3

    sget-object v4, La/e/a/a/h$a;->c:La/e/a/a/h$a;

    if-ne v3, v4, :cond_8

    move v3, v0

    goto :goto_0

    :cond_8
    move v3, v1

    :goto_0
    invoke-virtual {p0}, La/e/a/a/h;->q()La/e/a/a/h$a;

    move-result-object v4

    sget-object v5, La/e/a/a/h$a;->c:La/e/a/a/h$a;

    if-ne v4, v5, :cond_9

    move v4, v0

    goto :goto_1

    :cond_9
    move v4, v1

    :goto_1
    xor-int/2addr v3, v4

    if-eqz v3, :cond_a

    iget v3, p0, La/e/a/a/h;->J:F

    const/4 v4, 0x0

    cmpl-float v3, v3, v4

    if-eqz v3, :cond_a

    invoke-static {p0}, La/e/a/a/a;->a(La/e/a/a/h;)I

    goto :goto_2

    :cond_a
    invoke-virtual {p0}, La/e/a/a/h;->j()La/e/a/a/h$a;

    move-result-object v3

    sget-object v4, La/e/a/a/h$a;->c:La/e/a/a/h$a;

    if-eq v3, v4, :cond_b

    invoke-virtual {p0}, La/e/a/a/h;->q()La/e/a/a/h$a;

    move-result-object v3

    sget-object v4, La/e/a/a/h$a;->c:La/e/a/a/h$a;

    if-ne v3, v4, :cond_c

    :cond_b
    invoke-static {v2, p0, p1}, La/e/a/a/a;->a(La/e/a/a/i;La/e/a/a/h;La/e/a/a/j;)V

    if-eqz p3, :cond_c

    return v1

    :cond_c
    :goto_2
    iget-object v3, p0, La/e/a/a/h;->v:La/e/a/a/f;

    iget-object v3, v3, La/e/a/a/f;->d:La/e/a/a/f;

    if-nez v3, :cond_d

    iget-object v3, p0, La/e/a/a/h;->x:La/e/a/a/f;

    iget-object v3, v3, La/e/a/a/f;->d:La/e/a/a/f;

    if-eqz v3, :cond_10

    :cond_d
    iget-object v3, p0, La/e/a/a/h;->v:La/e/a/a/f;

    iget-object v3, v3, La/e/a/a/f;->d:La/e/a/a/f;

    if-eqz v3, :cond_e

    iget-object v3, v3, La/e/a/a/f;->b:La/e/a/a/h;

    iget-object v4, p0, La/e/a/a/h;->G:La/e/a/a/h;

    if-ne v3, v4, :cond_e

    iget-object v3, p0, La/e/a/a/h;->x:La/e/a/a/f;

    iget-object v3, v3, La/e/a/a/f;->d:La/e/a/a/f;

    if-eqz v3, :cond_10

    :cond_e
    iget-object v3, p0, La/e/a/a/h;->x:La/e/a/a/f;

    iget-object v3, v3, La/e/a/a/f;->d:La/e/a/a/f;

    if-eqz v3, :cond_f

    iget-object v3, v3, La/e/a/a/f;->b:La/e/a/a/h;

    iget-object v4, p0, La/e/a/a/h;->G:La/e/a/a/h;

    if-ne v3, v4, :cond_f

    iget-object v3, p0, La/e/a/a/h;->v:La/e/a/a/f;

    iget-object v3, v3, La/e/a/a/f;->d:La/e/a/a/f;

    if-eqz v3, :cond_10

    :cond_f
    iget-object v3, p0, La/e/a/a/h;->v:La/e/a/a/f;

    iget-object v3, v3, La/e/a/a/f;->d:La/e/a/a/f;

    if-eqz v3, :cond_11

    iget-object v3, v3, La/e/a/a/f;->b:La/e/a/a/h;

    iget-object v4, p0, La/e/a/a/h;->G:La/e/a/a/h;

    if-ne v3, v4, :cond_11

    iget-object v3, p0, La/e/a/a/h;->x:La/e/a/a/f;

    iget-object v3, v3, La/e/a/a/f;->d:La/e/a/a/f;

    if-eqz v3, :cond_11

    iget-object v3, v3, La/e/a/a/f;->b:La/e/a/a/h;

    if-ne v3, v4, :cond_11

    :cond_10
    iget-object v3, p0, La/e/a/a/h;->C:La/e/a/a/f;

    iget-object v3, v3, La/e/a/a/f;->d:La/e/a/a/f;

    if-nez v3, :cond_11

    instance-of v3, p0, La/e/a/a/l;

    if-nez v3, :cond_11

    instance-of v3, p0, La/e/a/a/m;

    if-nez v3, :cond_11

    iget-object v3, p1, La/e/a/a/j;->f:Ljava/util/List;

    invoke-interface {v3, p0}, Ljava/util/List;->add(Ljava/lang/Object;)Z

    :cond_11
    iget-object v3, p0, La/e/a/a/h;->w:La/e/a/a/f;

    iget-object v3, v3, La/e/a/a/f;->d:La/e/a/a/f;

    if-nez v3, :cond_12

    iget-object v3, p0, La/e/a/a/h;->y:La/e/a/a/f;

    iget-object v3, v3, La/e/a/a/f;->d:La/e/a/a/f;

    if-eqz v3, :cond_15

    :cond_12
    iget-object v3, p0, La/e/a/a/h;->w:La/e/a/a/f;

    iget-object v3, v3, La/e/a/a/f;->d:La/e/a/a/f;

    if-eqz v3, :cond_13

    iget-object v3, v3, La/e/a/a/f;->b:La/e/a/a/h;

    iget-object v4, p0, La/e/a/a/h;->G:La/e/a/a/h;

    if-ne v3, v4, :cond_13

    iget-object v3, p0, La/e/a/a/h;->y:La/e/a/a/f;

    iget-object v3, v3, La/e/a/a/f;->d:La/e/a/a/f;

    if-eqz v3, :cond_15

    :cond_13
    iget-object v3, p0, La/e/a/a/h;->y:La/e/a/a/f;

    iget-object v3, v3, La/e/a/a/f;->d:La/e/a/a/f;

    if-eqz v3, :cond_14

    iget-object v3, v3, La/e/a/a/f;->b:La/e/a/a/h;

    iget-object v4, p0, La/e/a/a/h;->G:La/e/a/a/h;

    if-ne v3, v4, :cond_14

    iget-object v3, p0, La/e/a/a/h;->w:La/e/a/a/f;

    iget-object v3, v3, La/e/a/a/f;->d:La/e/a/a/f;

    if-eqz v3, :cond_15

    :cond_14
    iget-object v3, p0, La/e/a/a/h;->w:La/e/a/a/f;

    iget-object v3, v3, La/e/a/a/f;->d:La/e/a/a/f;

    if-eqz v3, :cond_16

    iget-object v3, v3, La/e/a/a/f;->b:La/e/a/a/h;

    iget-object v4, p0, La/e/a/a/h;->G:La/e/a/a/h;

    if-ne v3, v4, :cond_16

    iget-object v3, p0, La/e/a/a/h;->y:La/e/a/a/f;

    iget-object v3, v3, La/e/a/a/f;->d:La/e/a/a/f;

    if-eqz v3, :cond_16

    iget-object v3, v3, La/e/a/a/f;->b:La/e/a/a/h;

    if-ne v3, v4, :cond_16

    :cond_15
    iget-object v3, p0, La/e/a/a/h;->C:La/e/a/a/f;

    iget-object v3, v3, La/e/a/a/f;->d:La/e/a/a/f;

    if-nez v3, :cond_16

    iget-object v3, p0, La/e/a/a/h;->z:La/e/a/a/f;

    iget-object v3, v3, La/e/a/a/f;->d:La/e/a/a/f;

    if-nez v3, :cond_16

    instance-of v3, p0, La/e/a/a/l;

    if-nez v3, :cond_16

    instance-of v3, p0, La/e/a/a/m;

    if-nez v3, :cond_16

    iget-object v3, p1, La/e/a/a/j;->g:Ljava/util/List;

    invoke-interface {v3, p0}, Ljava/util/List;->add(Ljava/lang/Object;)Z

    :cond_16
    instance-of v3, p0, La/e/a/a/m;

    if-eqz v3, :cond_19

    invoke-static {v2, p0, p1}, La/e/a/a/a;->a(La/e/a/a/i;La/e/a/a/h;La/e/a/a/j;)V

    if-eqz p3, :cond_17

    return v1

    :cond_17
    move-object v3, p0

    check-cast v3, La/e/a/a/m;

    move v4, v1

    :goto_3
    iget v5, v3, La/e/a/a/m;->wa:I

    if-ge v4, v5, :cond_19

    iget-object v5, v3, La/e/a/a/m;->va:[La/e/a/a/h;

    aget-object v5, v5, v4

    invoke-static {v5, p1, p2, p3}, La/e/a/a/a;->a(La/e/a/a/h;La/e/a/a/j;Ljava/util/List;Z)Z

    move-result v5

    if-nez v5, :cond_18

    return v1

    :cond_18
    add-int/lit8 v4, v4, 0x1

    goto :goto_3

    :cond_19
    iget-object v3, p0, La/e/a/a/h;->D:[La/e/a/a/f;

    array-length v3, v3

    move v4, v1

    :goto_4
    if-ge v4, v3, :cond_1d

    iget-object v5, p0, La/e/a/a/h;->D:[La/e/a/a/f;

    aget-object v5, v5, v4

    iget-object v6, v5, La/e/a/a/f;->d:La/e/a/a/f;

    if-eqz v6, :cond_1c

    iget-object v6, v6, La/e/a/a/f;->b:La/e/a/a/h;

    invoke-virtual {p0}, La/e/a/a/h;->k()La/e/a/a/h;

    move-result-object v7

    if-eq v6, v7, :cond_1c

    iget-object v6, v5, La/e/a/a/f;->c:La/e/a/a/f$c;

    sget-object v7, La/e/a/a/f$c;->g:La/e/a/a/f$c;

    if-ne v6, v7, :cond_1a

    invoke-static {v2, p0, p1}, La/e/a/a/a;->a(La/e/a/a/i;La/e/a/a/h;La/e/a/a/j;)V

    if-eqz p3, :cond_1b

    return v1

    :cond_1a
    invoke-static {v5}, La/e/a/a/a;->a(La/e/a/a/f;)V

    :cond_1b
    iget-object v5, v5, La/e/a/a/f;->d:La/e/a/a/f;

    iget-object v5, v5, La/e/a/a/f;->b:La/e/a/a/h;

    invoke-static {v5, p1, p2, p3}, La/e/a/a/a;->a(La/e/a/a/h;La/e/a/a/j;Ljava/util/List;Z)Z

    move-result v5

    if-nez v5, :cond_1c

    return v1

    :cond_1c
    add-int/lit8 v4, v4, 0x1

    goto :goto_4

    :cond_1d
    return v0

    :cond_1e
    if-eq v3, p1, :cond_20

    iget-object p3, p1, La/e/a/a/j;->a:Ljava/util/List;

    iget-object v2, v3, La/e/a/a/j;->a:Ljava/util/List;

    invoke-interface {p3, v2}, Ljava/util/List;->addAll(Ljava/util/Collection;)Z

    iget-object p3, p1, La/e/a/a/j;->f:Ljava/util/List;

    iget-object v2, p0, La/e/a/a/h;->s:La/e/a/a/j;

    iget-object v2, v2, La/e/a/a/j;->f:Ljava/util/List;

    invoke-interface {p3, v2}, Ljava/util/List;->addAll(Ljava/util/Collection;)Z

    iget-object p3, p1, La/e/a/a/j;->g:Ljava/util/List;

    iget-object v2, p0, La/e/a/a/h;->s:La/e/a/a/j;

    iget-object v2, v2, La/e/a/a/j;->g:Ljava/util/List;

    invoke-interface {p3, v2}, Ljava/util/List;->addAll(Ljava/util/Collection;)Z

    iget-object p3, p0, La/e/a/a/h;->s:La/e/a/a/j;

    iget-boolean p3, p3, La/e/a/a/j;->d:Z

    if-nez p3, :cond_1f

    iput-boolean v1, p1, La/e/a/a/j;->d:Z

    :cond_1f
    iget-object p3, p0, La/e/a/a/h;->s:La/e/a/a/j;

    invoke-interface {p2, p3}, Ljava/util/List;->remove(Ljava/lang/Object;)Z

    iget-object p0, p0, La/e/a/a/h;->s:La/e/a/a/j;

    iget-object p0, p0, La/e/a/a/j;->a:Ljava/util/List;

    invoke-interface {p0}, Ljava/util/List;->iterator()Ljava/util/Iterator;

    move-result-object p0

    :goto_5
    invoke-interface {p0}, Ljava/util/Iterator;->hasNext()Z

    move-result p2

    if-eqz p2, :cond_20

    invoke-interface {p0}, Ljava/util/Iterator;->next()Ljava/lang/Object;

    move-result-object p2

    check-cast p2, La/e/a/a/h;

    iput-object p1, p2, La/e/a/a/h;->s:La/e/a/a/j;

    goto :goto_5

    :cond_20
    return v0
.end method

.method private static a(La/e/a/a/h;Ljava/util/List;Z)Z
    .locals 3
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "(",
            "La/e/a/a/h;",
            "Ljava/util/List<",
            "La/e/a/a/j;",
            ">;Z)Z"
        }
    .end annotation

    new-instance v0, La/e/a/a/j;

    new-instance v1, Ljava/util/ArrayList;

    invoke-direct {v1}, Ljava/util/ArrayList;-><init>()V

    const/4 v2, 0x1

    invoke-direct {v0, v1, v2}, La/e/a/a/j;-><init>(Ljava/util/List;Z)V

    invoke-interface {p1, v0}, Ljava/util/List;->add(Ljava/lang/Object;)Z

    invoke-static {p0, v0, p1, p2}, La/e/a/a/a;->a(La/e/a/a/h;La/e/a/a/j;Ljava/util/List;Z)Z

    move-result p0

    return p0
.end method

.method private static b(La/e/a/a/i;)V
    .locals 2

    iget-object v0, p0, La/e/a/a/i;->Ha:Ljava/util/List;

    invoke-interface {v0}, Ljava/util/List;->clear()V

    iget-object v0, p0, La/e/a/a/i;->Ha:Ljava/util/List;

    new-instance v1, La/e/a/a/j;

    iget-object p0, p0, La/e/a/a/t;->va:Ljava/util/ArrayList;

    invoke-direct {v1, p0}, La/e/a/a/j;-><init>(Ljava/util/List;)V

    const/4 p0, 0x0

    invoke-interface {v0, p0, v1}, Ljava/util/List;->add(ILjava/lang/Object;)V

    return-void
.end method
