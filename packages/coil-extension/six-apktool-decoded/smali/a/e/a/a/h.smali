.class public La/e/a/a/h;
.super Ljava/lang/Object;
.source ""


# annotations
.annotation system Ldalvik/annotation/MemberClasses;
    value = {
        La/e/a/a/h$a;
    }
.end annotation


# static fields
.field public static a:F = 0.5f


# instance fields
.field A:La/e/a/a/f;

.field B:La/e/a/a/f;

.field C:La/e/a/a/f;

.field protected D:[La/e/a/a/f;

.field protected E:Ljava/util/ArrayList;
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "Ljava/util/ArrayList<",
            "La/e/a/a/f;",
            ">;"
        }
    .end annotation
.end field

.field protected F:[La/e/a/a/h$a;

.field G:La/e/a/a/h;

.field H:I

.field I:I

.field protected J:F

.field protected K:I

.field protected L:I

.field protected M:I

.field N:I

.field O:I

.field private P:I

.field private Q:I

.field private R:I

.field private S:I

.field protected T:I

.field protected U:I

.field V:I

.field protected W:I

.field protected X:I

.field private Y:I

.field private Z:I

.field aa:F

.field public b:I

.field ba:F

.field public c:I

.field private ca:Ljava/lang/Object;

.field d:La/e/a/a/q;

.field private da:I

.field e:La/e/a/a/q;

.field private ea:I

.field f:I

.field private fa:Ljava/lang/String;

.field g:I

.field private ga:Ljava/lang/String;

.field h:[I

.field ha:Z

.field i:I

.field ia:Z

.field j:I

.field ja:Z

.field k:F

.field ka:Z

.field l:I

.field la:Z

.field m:I

.field ma:I

.field n:F

.field na:I

.field o:Z

.field oa:Z

.field p:Z

.field pa:Z

.field q:I

.field qa:[F

.field r:F

.field protected ra:[La/e/a/a/h;

.field s:La/e/a/a/j;

.field protected sa:[La/e/a/a/h;

.field private t:[I

.field ta:La/e/a/a/h;

.field private u:F

.field ua:La/e/a/a/h;

.field v:La/e/a/a/f;

.field w:La/e/a/a/f;

.field x:La/e/a/a/f;

.field y:La/e/a/a/f;

.field z:La/e/a/a/f;


# direct methods
.method public constructor <init>()V
    .locals 9

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    const/4 v0, -0x1

    iput v0, p0, La/e/a/a/h;->b:I

    iput v0, p0, La/e/a/a/h;->c:I

    const/4 v1, 0x0

    iput v1, p0, La/e/a/a/h;->f:I

    iput v1, p0, La/e/a/a/h;->g:I

    const/4 v2, 0x2

    new-array v3, v2, [I

    iput-object v3, p0, La/e/a/a/h;->h:[I

    iput v1, p0, La/e/a/a/h;->i:I

    iput v1, p0, La/e/a/a/h;->j:I

    const/high16 v3, 0x3f800000    # 1.0f

    iput v3, p0, La/e/a/a/h;->k:F

    iput v1, p0, La/e/a/a/h;->l:I

    iput v1, p0, La/e/a/a/h;->m:I

    iput v3, p0, La/e/a/a/h;->n:F

    iput v0, p0, La/e/a/a/h;->q:I

    iput v3, p0, La/e/a/a/h;->r:F

    const/4 v3, 0x0

    iput-object v3, p0, La/e/a/a/h;->s:La/e/a/a/j;

    new-array v4, v2, [I

    fill-array-data v4, :array_0

    iput-object v4, p0, La/e/a/a/h;->t:[I

    const/4 v4, 0x0

    iput v4, p0, La/e/a/a/h;->u:F

    new-instance v5, La/e/a/a/f;

    sget-object v6, La/e/a/a/f$c;->b:La/e/a/a/f$c;

    invoke-direct {v5, p0, v6}, La/e/a/a/f;-><init>(La/e/a/a/h;La/e/a/a/f$c;)V

    iput-object v5, p0, La/e/a/a/h;->v:La/e/a/a/f;

    new-instance v5, La/e/a/a/f;

    sget-object v6, La/e/a/a/f$c;->c:La/e/a/a/f$c;

    invoke-direct {v5, p0, v6}, La/e/a/a/f;-><init>(La/e/a/a/h;La/e/a/a/f$c;)V

    iput-object v5, p0, La/e/a/a/h;->w:La/e/a/a/f;

    new-instance v5, La/e/a/a/f;

    sget-object v6, La/e/a/a/f$c;->d:La/e/a/a/f$c;

    invoke-direct {v5, p0, v6}, La/e/a/a/f;-><init>(La/e/a/a/h;La/e/a/a/f$c;)V

    iput-object v5, p0, La/e/a/a/h;->x:La/e/a/a/f;

    new-instance v5, La/e/a/a/f;

    sget-object v6, La/e/a/a/f$c;->e:La/e/a/a/f$c;

    invoke-direct {v5, p0, v6}, La/e/a/a/f;-><init>(La/e/a/a/h;La/e/a/a/f$c;)V

    iput-object v5, p0, La/e/a/a/h;->y:La/e/a/a/f;

    new-instance v5, La/e/a/a/f;

    sget-object v6, La/e/a/a/f$c;->f:La/e/a/a/f$c;

    invoke-direct {v5, p0, v6}, La/e/a/a/f;-><init>(La/e/a/a/h;La/e/a/a/f$c;)V

    iput-object v5, p0, La/e/a/a/h;->z:La/e/a/a/f;

    new-instance v5, La/e/a/a/f;

    sget-object v6, La/e/a/a/f$c;->h:La/e/a/a/f$c;

    invoke-direct {v5, p0, v6}, La/e/a/a/f;-><init>(La/e/a/a/h;La/e/a/a/f$c;)V

    iput-object v5, p0, La/e/a/a/h;->A:La/e/a/a/f;

    new-instance v5, La/e/a/a/f;

    sget-object v6, La/e/a/a/f$c;->i:La/e/a/a/f$c;

    invoke-direct {v5, p0, v6}, La/e/a/a/f;-><init>(La/e/a/a/h;La/e/a/a/f$c;)V

    iput-object v5, p0, La/e/a/a/h;->B:La/e/a/a/f;

    new-instance v5, La/e/a/a/f;

    sget-object v6, La/e/a/a/f$c;->g:La/e/a/a/f$c;

    invoke-direct {v5, p0, v6}, La/e/a/a/f;-><init>(La/e/a/a/h;La/e/a/a/f$c;)V

    iput-object v5, p0, La/e/a/a/h;->C:La/e/a/a/f;

    const/4 v5, 0x6

    new-array v5, v5, [La/e/a/a/f;

    iget-object v6, p0, La/e/a/a/h;->v:La/e/a/a/f;

    aput-object v6, v5, v1

    iget-object v6, p0, La/e/a/a/h;->x:La/e/a/a/f;

    const/4 v7, 0x1

    aput-object v6, v5, v7

    iget-object v6, p0, La/e/a/a/h;->w:La/e/a/a/f;

    aput-object v6, v5, v2

    iget-object v6, p0, La/e/a/a/h;->y:La/e/a/a/f;

    const/4 v8, 0x3

    aput-object v6, v5, v8

    iget-object v6, p0, La/e/a/a/h;->z:La/e/a/a/f;

    const/4 v8, 0x4

    aput-object v6, v5, v8

    iget-object v6, p0, La/e/a/a/h;->C:La/e/a/a/f;

    const/4 v8, 0x5

    aput-object v6, v5, v8

    iput-object v5, p0, La/e/a/a/h;->D:[La/e/a/a/f;

    new-instance v5, Ljava/util/ArrayList;

    invoke-direct {v5}, Ljava/util/ArrayList;-><init>()V

    iput-object v5, p0, La/e/a/a/h;->E:Ljava/util/ArrayList;

    new-array v5, v2, [La/e/a/a/h$a;

    sget-object v6, La/e/a/a/h$a;->a:La/e/a/a/h$a;

    aput-object v6, v5, v1

    aput-object v6, v5, v7

    iput-object v5, p0, La/e/a/a/h;->F:[La/e/a/a/h$a;

    iput-object v3, p0, La/e/a/a/h;->G:La/e/a/a/h;

    iput v1, p0, La/e/a/a/h;->H:I

    iput v1, p0, La/e/a/a/h;->I:I

    iput v4, p0, La/e/a/a/h;->J:F

    iput v0, p0, La/e/a/a/h;->K:I

    iput v1, p0, La/e/a/a/h;->L:I

    iput v1, p0, La/e/a/a/h;->M:I

    iput v1, p0, La/e/a/a/h;->N:I

    iput v1, p0, La/e/a/a/h;->O:I

    iput v1, p0, La/e/a/a/h;->P:I

    iput v1, p0, La/e/a/a/h;->Q:I

    iput v1, p0, La/e/a/a/h;->R:I

    iput v1, p0, La/e/a/a/h;->S:I

    iput v1, p0, La/e/a/a/h;->T:I

    iput v1, p0, La/e/a/a/h;->U:I

    iput v1, p0, La/e/a/a/h;->V:I

    sget v0, La/e/a/a/h;->a:F

    iput v0, p0, La/e/a/a/h;->aa:F

    iput v0, p0, La/e/a/a/h;->ba:F

    iput v1, p0, La/e/a/a/h;->da:I

    iput v1, p0, La/e/a/a/h;->ea:I

    iput-object v3, p0, La/e/a/a/h;->fa:Ljava/lang/String;

    iput-object v3, p0, La/e/a/a/h;->ga:Ljava/lang/String;

    iput-boolean v1, p0, La/e/a/a/h;->ja:Z

    iput-boolean v1, p0, La/e/a/a/h;->ka:Z

    iput-boolean v1, p0, La/e/a/a/h;->la:Z

    iput v1, p0, La/e/a/a/h;->ma:I

    iput v1, p0, La/e/a/a/h;->na:I

    new-array v0, v2, [F

    fill-array-data v0, :array_1

    iput-object v0, p0, La/e/a/a/h;->qa:[F

    new-array v0, v2, [La/e/a/a/h;

    aput-object v3, v0, v1

    aput-object v3, v0, v7

    iput-object v0, p0, La/e/a/a/h;->ra:[La/e/a/a/h;

    new-array v0, v2, [La/e/a/a/h;

    aput-object v3, v0, v1

    aput-object v3, v0, v7

    iput-object v0, p0, La/e/a/a/h;->sa:[La/e/a/a/h;

    iput-object v3, p0, La/e/a/a/h;->ta:La/e/a/a/h;

    iput-object v3, p0, La/e/a/a/h;->ua:La/e/a/a/h;

    invoke-direct {p0}, La/e/a/a/h;->J()V

    return-void

    :array_0
    .array-data 4
        0x7fffffff
        0x7fffffff
    .end array-data

    :array_1
    .array-data 4
        -0x40800000    # -1.0f
        -0x40800000    # -1.0f
    .end array-data
.end method

.method private J()V
    .locals 2

    iget-object v0, p0, La/e/a/a/h;->E:Ljava/util/ArrayList;

    iget-object v1, p0, La/e/a/a/h;->v:La/e/a/a/f;

    invoke-virtual {v0, v1}, Ljava/util/ArrayList;->add(Ljava/lang/Object;)Z

    iget-object v0, p0, La/e/a/a/h;->E:Ljava/util/ArrayList;

    iget-object v1, p0, La/e/a/a/h;->w:La/e/a/a/f;

    invoke-virtual {v0, v1}, Ljava/util/ArrayList;->add(Ljava/lang/Object;)Z

    iget-object v0, p0, La/e/a/a/h;->E:Ljava/util/ArrayList;

    iget-object v1, p0, La/e/a/a/h;->x:La/e/a/a/f;

    invoke-virtual {v0, v1}, Ljava/util/ArrayList;->add(Ljava/lang/Object;)Z

    iget-object v0, p0, La/e/a/a/h;->E:Ljava/util/ArrayList;

    iget-object v1, p0, La/e/a/a/h;->y:La/e/a/a/f;

    invoke-virtual {v0, v1}, Ljava/util/ArrayList;->add(Ljava/lang/Object;)Z

    iget-object v0, p0, La/e/a/a/h;->E:Ljava/util/ArrayList;

    iget-object v1, p0, La/e/a/a/h;->A:La/e/a/a/f;

    invoke-virtual {v0, v1}, Ljava/util/ArrayList;->add(Ljava/lang/Object;)Z

    iget-object v0, p0, La/e/a/a/h;->E:Ljava/util/ArrayList;

    iget-object v1, p0, La/e/a/a/h;->B:La/e/a/a/f;

    invoke-virtual {v0, v1}, Ljava/util/ArrayList;->add(Ljava/lang/Object;)Z

    iget-object v0, p0, La/e/a/a/h;->E:Ljava/util/ArrayList;

    iget-object v1, p0, La/e/a/a/h;->C:La/e/a/a/f;

    invoke-virtual {v0, v1}, Ljava/util/ArrayList;->add(Ljava/lang/Object;)Z

    iget-object v0, p0, La/e/a/a/h;->E:Ljava/util/ArrayList;

    iget-object v1, p0, La/e/a/a/h;->z:La/e/a/a/f;

    invoke-virtual {v0, v1}, Ljava/util/ArrayList;->add(Ljava/lang/Object;)Z

    return-void
.end method

.method private a(La/e/a/e;ZLa/e/a/i;La/e/a/i;La/e/a/a/h$a;ZLa/e/a/a/f;La/e/a/a/f;IIIIFZZIIIFZ)V
    .locals 25

    move-object/from16 v0, p0

    move-object/from16 v10, p1

    move-object/from16 v11, p3

    move-object/from16 v12, p4

    move-object/from16 v13, p7

    move-object/from16 v14, p8

    move/from16 v1, p11

    move/from16 v2, p12

    invoke-virtual {v10, v13}, La/e/a/e;->a(Ljava/lang/Object;)La/e/a/i;

    move-result-object v15

    invoke-virtual {v10, v14}, La/e/a/e;->a(Ljava/lang/Object;)La/e/a/i;

    move-result-object v9

    invoke-virtual/range {p7 .. p7}, La/e/a/a/f;->g()La/e/a/a/f;

    move-result-object v3

    invoke-virtual {v10, v3}, La/e/a/e;->a(Ljava/lang/Object;)La/e/a/i;

    move-result-object v8

    invoke-virtual/range {p8 .. p8}, La/e/a/a/f;->g()La/e/a/a/f;

    move-result-object v3

    invoke-virtual {v10, v3}, La/e/a/e;->a(Ljava/lang/Object;)La/e/a/i;

    move-result-object v7

    iget-boolean v3, v10, La/e/a/e;->i:Z

    const/4 v6, 0x1

    const/4 v4, 0x6

    const/4 v5, 0x0

    if-eqz v3, :cond_2

    invoke-virtual/range {p7 .. p7}, La/e/a/a/f;->d()La/e/a/a/p;

    move-result-object v3

    iget v3, v3, La/e/a/a/r;->b:I

    if-ne v3, v6, :cond_2

    invoke-virtual/range {p8 .. p8}, La/e/a/a/f;->d()La/e/a/a/p;

    move-result-object v3

    iget v3, v3, La/e/a/a/r;->b:I

    if-ne v3, v6, :cond_2

    invoke-static {}, La/e/a/e;->e()La/e/a/f;

    move-result-object v1

    if-eqz v1, :cond_0

    invoke-static {}, La/e/a/e;->e()La/e/a/f;

    move-result-object v1

    iget-wide v2, v1, La/e/a/f;->r:J

    const-wide/16 v6, 0x1

    add-long/2addr v2, v6

    iput-wide v2, v1, La/e/a/f;->r:J

    :cond_0
    invoke-virtual/range {p7 .. p7}, La/e/a/a/f;->d()La/e/a/a/p;

    move-result-object v1

    invoke-virtual {v1, v10}, La/e/a/a/p;->a(La/e/a/e;)V

    invoke-virtual/range {p8 .. p8}, La/e/a/a/f;->d()La/e/a/a/p;

    move-result-object v1

    invoke-virtual {v1, v10}, La/e/a/a/p;->a(La/e/a/e;)V

    if-nez p15, :cond_1

    if-eqz p2, :cond_1

    invoke-virtual {v10, v12, v9, v5, v4}, La/e/a/e;->b(La/e/a/i;La/e/a/i;II)V

    :cond_1
    return-void

    :cond_2
    invoke-static {}, La/e/a/e;->e()La/e/a/f;

    move-result-object v3

    if-eqz v3, :cond_3

    invoke-static {}, La/e/a/e;->e()La/e/a/f;

    move-result-object v3

    iget-wide v4, v3, La/e/a/f;->z:J

    const-wide/16 v16, 0x1

    add-long v4, v4, v16

    iput-wide v4, v3, La/e/a/f;->z:J

    :cond_3
    invoke-virtual/range {p7 .. p7}, La/e/a/a/f;->i()Z

    move-result v16

    invoke-virtual/range {p8 .. p8}, La/e/a/a/f;->i()Z

    move-result v17

    iget-object v3, v0, La/e/a/a/h;->C:La/e/a/a/f;

    invoke-virtual {v3}, La/e/a/a/f;->i()Z

    move-result v20

    if-eqz v16, :cond_4

    move v3, v6

    goto :goto_0

    :cond_4
    const/4 v3, 0x0

    :goto_0
    if-eqz v17, :cond_5

    add-int/lit8 v3, v3, 0x1

    :cond_5
    if-eqz v20, :cond_6

    add-int/lit8 v3, v3, 0x1

    :cond_6
    move v5, v3

    if-eqz p14, :cond_7

    const/4 v3, 0x3

    goto :goto_1

    :cond_7
    move/from16 v3, p16

    :goto_1
    sget-object v21, La/e/a/a/g;->b:[I

    invoke-virtual/range {p5 .. p5}, Ljava/lang/Enum;->ordinal()I

    move-result v22

    aget v4, v21, v22

    const/4 v14, 0x2

    const/4 v13, 0x4

    if-eq v4, v6, :cond_8

    if-eq v4, v14, :cond_8

    const/4 v14, 0x3

    if-eq v4, v14, :cond_8

    if-eq v4, v13, :cond_9

    :cond_8
    :goto_2
    const/4 v4, 0x0

    goto :goto_3

    :cond_9
    if-ne v3, v13, :cond_a

    goto :goto_2

    :cond_a
    move v4, v6

    :goto_3
    iget v14, v0, La/e/a/a/h;->ea:I

    const/16 v13, 0x8

    if-ne v14, v13, :cond_b

    const/4 v4, 0x0

    const/4 v13, 0x0

    goto :goto_4

    :cond_b
    move v13, v4

    move/from16 v4, p10

    :goto_4
    if-eqz p20, :cond_d

    if-nez v16, :cond_c

    if-nez v17, :cond_c

    if-nez v20, :cond_c

    move/from16 v14, p9

    invoke-virtual {v10, v15, v14}, La/e/a/e;->a(La/e/a/i;I)V

    goto :goto_5

    :cond_c
    if-eqz v16, :cond_d

    if-nez v17, :cond_d

    invoke-virtual/range {p7 .. p7}, La/e/a/a/f;->b()I

    move-result v14

    const/4 v6, 0x6

    invoke-virtual {v10, v15, v8, v14, v6}, La/e/a/e;->a(La/e/a/i;La/e/a/i;II)La/e/a/b;

    goto :goto_6

    :cond_d
    :goto_5
    const/4 v6, 0x6

    :goto_6
    if-nez v13, :cond_11

    if-eqz p6, :cond_10

    const/4 v6, 0x0

    const/4 v14, 0x3

    invoke-virtual {v10, v9, v15, v6, v14}, La/e/a/e;->a(La/e/a/i;La/e/a/i;II)La/e/a/b;

    if-lez v1, :cond_e

    const/4 v4, 0x6

    invoke-virtual {v10, v9, v15, v1, v4}, La/e/a/e;->b(La/e/a/i;La/e/a/i;II)V

    goto :goto_7

    :cond_e
    const/4 v4, 0x6

    :goto_7
    const v6, 0x7fffffff

    if-ge v2, v6, :cond_f

    invoke-virtual {v10, v9, v15, v2, v4}, La/e/a/e;->c(La/e/a/i;La/e/a/i;II)V

    :cond_f
    move v6, v4

    goto :goto_8

    :cond_10
    const/4 v14, 0x3

    invoke-virtual {v10, v9, v15, v4, v6}, La/e/a/e;->a(La/e/a/i;La/e/a/i;II)La/e/a/b;

    :goto_8
    move/from16 v14, p18

    move/from16 p9, v3

    move v0, v5

    move-object/from16 v24, v7

    move-object/from16 v23, v8

    const/4 v1, 0x0

    const/4 v2, 0x2

    move/from16 v3, p17

    goto/16 :goto_10

    :cond_11
    const/4 v14, 0x3

    const/4 v2, -0x2

    move/from16 v14, p17

    if-ne v14, v2, :cond_12

    move/from16 v14, p18

    move v6, v4

    goto :goto_9

    :cond_12
    move v6, v14

    move/from16 v14, p18

    :goto_9
    if-ne v14, v2, :cond_13

    move v14, v4

    :cond_13
    if-lez v6, :cond_14

    const/4 v2, 0x6

    invoke-virtual {v10, v9, v15, v6, v2}, La/e/a/e;->b(La/e/a/i;La/e/a/i;II)V

    invoke-static {v4, v6}, Ljava/lang/Math;->max(II)I

    move-result v4

    goto :goto_a

    :cond_14
    const/4 v2, 0x6

    :goto_a
    if-lez v14, :cond_15

    invoke-virtual {v10, v9, v15, v14, v2}, La/e/a/e;->c(La/e/a/i;La/e/a/i;II)V

    invoke-static {v4, v14}, Ljava/lang/Math;->min(II)I

    move-result v4

    :cond_15
    const/4 v2, 0x1

    if-ne v3, v2, :cond_18

    if-eqz p2, :cond_16

    const/4 v2, 0x6

    invoke-virtual {v10, v9, v15, v4, v2}, La/e/a/e;->a(La/e/a/i;La/e/a/i;II)La/e/a/b;

    move/from16 p9, v3

    move v0, v5

    move-object/from16 v24, v7

    move-object/from16 v23, v8

    move/from16 p10, v13

    const/4 v1, 0x0

    move v8, v4

    move v13, v6

    goto/16 :goto_e

    :cond_16
    const/4 v2, 0x6

    if-eqz p15, :cond_17

    move/from16 p10, v13

    const/4 v13, 0x4

    invoke-virtual {v10, v9, v15, v4, v13}, La/e/a/e;->a(La/e/a/i;La/e/a/i;II)La/e/a/b;

    goto/16 :goto_d

    :cond_17
    move/from16 p10, v13

    const/4 v2, 0x1

    const/4 v13, 0x4

    invoke-virtual {v10, v9, v15, v4, v2}, La/e/a/e;->a(La/e/a/i;La/e/a/i;II)La/e/a/b;

    goto/16 :goto_d

    :cond_18
    move/from16 p10, v13

    const/4 v2, 0x2

    const/4 v13, 0x4

    if-ne v3, v2, :cond_1b

    invoke-virtual/range {p7 .. p7}, La/e/a/a/f;->h()La/e/a/a/f$c;

    move-result-object v2

    sget-object v13, La/e/a/a/f$c;->c:La/e/a/a/f$c;

    if-eq v2, v13, :cond_1a

    invoke-virtual/range {p7 .. p7}, La/e/a/a/f;->h()La/e/a/a/f$c;

    move-result-object v2

    sget-object v13, La/e/a/a/f$c;->e:La/e/a/a/f$c;

    if-ne v2, v13, :cond_19

    goto :goto_b

    :cond_19
    iget-object v2, v0, La/e/a/a/h;->G:La/e/a/a/h;

    sget-object v13, La/e/a/a/f$c;->b:La/e/a/a/f$c;

    invoke-virtual {v2, v13}, La/e/a/a/h;->a(La/e/a/a/f$c;)La/e/a/a/f;

    move-result-object v2

    invoke-virtual {v10, v2}, La/e/a/e;->a(Ljava/lang/Object;)La/e/a/i;

    move-result-object v2

    iget-object v13, v0, La/e/a/a/h;->G:La/e/a/a/h;

    move-object/from16 p6, v2

    sget-object v2, La/e/a/a/f$c;->d:La/e/a/a/f$c;

    goto :goto_c

    :cond_1a
    :goto_b
    iget-object v2, v0, La/e/a/a/h;->G:La/e/a/a/h;

    sget-object v13, La/e/a/a/f$c;->c:La/e/a/a/f$c;

    invoke-virtual {v2, v13}, La/e/a/a/h;->a(La/e/a/a/f$c;)La/e/a/a/f;

    move-result-object v2

    invoke-virtual {v10, v2}, La/e/a/e;->a(Ljava/lang/Object;)La/e/a/i;

    move-result-object v2

    iget-object v13, v0, La/e/a/a/h;->G:La/e/a/a/h;

    move-object/from16 p6, v2

    sget-object v2, La/e/a/a/f$c;->e:La/e/a/a/f$c;

    :goto_c
    invoke-virtual {v13, v2}, La/e/a/a/h;->a(La/e/a/a/f$c;)La/e/a/a/f;

    move-result-object v2

    invoke-virtual {v10, v2}, La/e/a/e;->a(Ljava/lang/Object;)La/e/a/i;

    move-result-object v2

    move-object/from16 v22, p6

    move-object v13, v2

    invoke-virtual/range {p1 .. p1}, La/e/a/e;->b()La/e/a/b;

    move-result-object v2

    move-object/from16 p6, v2

    const/16 v18, 0x1

    const/16 v21, 0x6

    move v0, v3

    move-object v3, v9

    move/from16 p9, v0

    move-object/from16 v23, v8

    move/from16 v0, v21

    move v8, v4

    move-object v4, v15

    move v0, v5

    const/4 v1, 0x0

    move-object v5, v13

    move v13, v6

    move-object/from16 v6, v22

    move-object/from16 v24, v7

    move/from16 v7, p19

    invoke-virtual/range {v2 .. v7}, La/e/a/b;->a(La/e/a/i;La/e/a/i;La/e/a/i;La/e/a/i;F)La/e/a/b;

    invoke-virtual {v10, v2}, La/e/a/e;->a(La/e/a/b;)V

    move v5, v1

    goto :goto_f

    :cond_1b
    :goto_d
    move/from16 p9, v3

    move v0, v5

    move v13, v6

    move-object/from16 v24, v7

    move-object/from16 v23, v8

    const/4 v1, 0x0

    move v8, v4

    :goto_e
    move/from16 v5, p10

    :goto_f
    if-eqz v5, :cond_1d

    const/4 v2, 0x2

    if-eq v0, v2, :cond_1e

    if-nez p14, :cond_1e

    invoke-static {v13, v8}, Ljava/lang/Math;->max(II)I

    move-result v3

    if-lez v14, :cond_1c

    invoke-static {v14, v3}, Ljava/lang/Math;->min(II)I

    move-result v3

    :cond_1c
    const/4 v4, 0x6

    invoke-virtual {v10, v9, v15, v3, v4}, La/e/a/e;->a(La/e/a/i;La/e/a/i;II)La/e/a/b;

    move v3, v13

    move v13, v1

    goto :goto_10

    :cond_1d
    const/4 v2, 0x2

    :cond_1e
    move v3, v13

    move v13, v5

    :goto_10
    if-eqz p20, :cond_3c

    if-eqz p15, :cond_1f

    goto/16 :goto_1f

    :cond_1f
    const/4 v0, 0x5

    if-nez v16, :cond_20

    if-nez v17, :cond_20

    if-nez v20, :cond_20

    if-eqz p2, :cond_3a

    goto :goto_11

    :cond_20
    if-eqz v16, :cond_21

    if-nez v17, :cond_21

    if-eqz p2, :cond_3a

    :goto_11
    invoke-virtual {v10, v12, v9, v1, v0}, La/e/a/e;->b(La/e/a/i;La/e/a/i;II)V

    goto/16 :goto_1d

    :cond_21
    if-nez v16, :cond_22

    if-eqz v17, :cond_22

    invoke-virtual/range {p8 .. p8}, La/e/a/a/f;->b()I

    move-result v2

    neg-int v2, v2

    move-object/from16 v8, v24

    const/4 v3, 0x6

    invoke-virtual {v10, v9, v8, v2, v3}, La/e/a/e;->a(La/e/a/i;La/e/a/i;II)La/e/a/b;

    if-eqz p2, :cond_3a

    invoke-virtual {v10, v15, v11, v1, v0}, La/e/a/e;->b(La/e/a/i;La/e/a/i;II)V

    goto/16 :goto_1d

    :cond_22
    move-object/from16 v8, v24

    if-eqz v16, :cond_3a

    if-eqz v17, :cond_3a

    if-eqz v13, :cond_2e

    if-eqz p2, :cond_23

    move v7, v1

    if-nez p11, :cond_24

    const/4 v1, 0x6

    invoke-virtual {v10, v9, v15, v7, v1}, La/e/a/e;->b(La/e/a/i;La/e/a/i;II)V

    goto :goto_12

    :cond_23
    move v7, v1

    :cond_24
    :goto_12
    if-nez p9, :cond_29

    if-gtz v14, :cond_26

    if-lez v3, :cond_25

    goto :goto_13

    :cond_25
    move v6, v7

    const/4 v1, 0x6

    goto :goto_14

    :cond_26
    :goto_13
    const/4 v1, 0x4

    const/4 v6, 0x1

    :goto_14
    invoke-virtual/range {p7 .. p7}, La/e/a/a/f;->b()I

    move-result v2

    move-object/from16 v5, v23

    invoke-virtual {v10, v15, v5, v2, v1}, La/e/a/e;->a(La/e/a/i;La/e/a/i;II)La/e/a/b;

    invoke-virtual/range {p8 .. p8}, La/e/a/a/f;->b()I

    move-result v2

    neg-int v2, v2

    invoke-virtual {v10, v9, v8, v2, v1}, La/e/a/e;->a(La/e/a/i;La/e/a/i;II)La/e/a/b;

    if-gtz v14, :cond_28

    if-lez v3, :cond_27

    goto :goto_15

    :cond_27
    move v1, v7

    goto :goto_16

    :cond_28
    :goto_15
    const/4 v1, 0x1

    :goto_16
    move-object/from16 v4, p0

    move v14, v0

    move/from16 v16, v6

    const/4 v6, 0x1

    goto :goto_1a

    :cond_29
    move/from16 v4, p9

    move-object/from16 v5, v23

    const/4 v6, 0x1

    if-ne v4, v6, :cond_2a

    const/4 v14, 0x6

    move-object/from16 v4, p0

    :goto_17
    move v1, v6

    goto :goto_19

    :cond_2a
    const/4 v1, 0x3

    if-ne v4, v1, :cond_2d

    if-nez p14, :cond_2b

    move-object/from16 v4, p0

    iget v1, v4, La/e/a/a/h;->q:I

    const/4 v2, -0x1

    if-eq v1, v2, :cond_2c

    if-gtz v14, :cond_2c

    const/4 v1, 0x6

    goto :goto_18

    :cond_2b
    move-object/from16 v4, p0

    :cond_2c
    const/4 v1, 0x4

    :goto_18
    invoke-virtual/range {p7 .. p7}, La/e/a/a/f;->b()I

    move-result v2

    invoke-virtual {v10, v15, v5, v2, v1}, La/e/a/e;->a(La/e/a/i;La/e/a/i;II)La/e/a/b;

    invoke-virtual/range {p8 .. p8}, La/e/a/a/f;->b()I

    move-result v2

    neg-int v2, v2

    invoke-virtual {v10, v9, v8, v2, v1}, La/e/a/e;->a(La/e/a/i;La/e/a/i;II)La/e/a/b;

    move v14, v0

    goto :goto_17

    :cond_2d
    move-object/from16 v4, p0

    move v14, v0

    move v1, v7

    :goto_19
    move/from16 v16, v1

    goto :goto_1a

    :cond_2e
    const/4 v6, 0x1

    move-object/from16 v4, p0

    move v7, v1

    move-object/from16 v5, v23

    move v14, v0

    move v1, v6

    move/from16 v16, v7

    :goto_1a
    if-eqz v1, :cond_30

    invoke-virtual/range {p7 .. p7}, La/e/a/a/f;->b()I

    move-result v17

    invoke-virtual/range {p8 .. p8}, La/e/a/a/f;->b()I

    move-result v18

    move-object/from16 v1, p1

    move-object v2, v15

    move-object v3, v5

    move/from16 v4, v17

    move-object/from16 v17, v5

    move/from16 v5, p13

    move/from16 v19, v6

    move-object v6, v8

    move v0, v7

    move-object v7, v9

    move-object v12, v8

    move-object/from16 v0, v17

    move/from16 v8, v18

    move-object v11, v9

    move v9, v14

    invoke-virtual/range {v1 .. v9}, La/e/a/e;->a(La/e/a/i;La/e/a/i;IFLa/e/a/i;La/e/a/i;II)V

    move-object/from16 v1, p7

    iget-object v2, v1, La/e/a/a/f;->d:La/e/a/a/f;

    iget-object v2, v2, La/e/a/a/f;->b:La/e/a/a/h;

    instance-of v2, v2, La/e/a/a/b;

    move-object/from16 v3, p8

    iget-object v4, v3, La/e/a/a/f;->d:La/e/a/a/f;

    iget-object v4, v4, La/e/a/a/f;->b:La/e/a/a/h;

    instance-of v4, v4, La/e/a/a/b;

    if-eqz v2, :cond_2f

    if-nez v4, :cond_2f

    move/from16 v2, v19

    const/4 v4, 0x5

    const/4 v5, 0x6

    move/from16 v19, p2

    goto :goto_1c

    :cond_2f
    if-nez v2, :cond_31

    if-eqz v4, :cond_31

    move/from16 v2, p2

    const/4 v4, 0x6

    goto :goto_1b

    :cond_30
    move-object/from16 v1, p7

    move-object/from16 v3, p8

    move-object v0, v5

    move-object v12, v8

    move-object v11, v9

    :cond_31
    move/from16 v2, p2

    move/from16 v19, v2

    const/4 v4, 0x5

    :goto_1b
    const/4 v5, 0x5

    :goto_1c
    if-eqz v16, :cond_32

    const/4 v4, 0x6

    const/4 v5, 0x6

    :cond_32
    if-nez v13, :cond_33

    if-nez v19, :cond_34

    :cond_33
    if-eqz v16, :cond_35

    :cond_34
    invoke-virtual/range {p7 .. p7}, La/e/a/a/f;->b()I

    move-result v1

    invoke-virtual {v10, v15, v0, v1, v4}, La/e/a/e;->b(La/e/a/i;La/e/a/i;II)V

    :cond_35
    if-nez v13, :cond_36

    if-nez v2, :cond_37

    :cond_36
    if-eqz v16, :cond_38

    :cond_37
    invoke-virtual/range {p8 .. p8}, La/e/a/a/f;->b()I

    move-result v0

    neg-int v0, v0

    invoke-virtual {v10, v11, v12, v0, v5}, La/e/a/e;->c(La/e/a/i;La/e/a/i;II)V

    :cond_38
    if-eqz p2, :cond_39

    move-object/from16 v0, p3

    move-object v1, v11

    const/4 v2, 0x6

    const/4 v3, 0x0

    invoke-virtual {v10, v15, v0, v3, v2}, La/e/a/e;->b(La/e/a/i;La/e/a/i;II)V

    goto :goto_1e

    :cond_39
    move-object v1, v11

    const/4 v2, 0x6

    const/4 v3, 0x0

    goto :goto_1e

    :cond_3a
    :goto_1d
    move v3, v1

    move-object v1, v9

    const/4 v2, 0x6

    :goto_1e
    if-eqz p2, :cond_3b

    move-object/from16 v4, p4

    invoke-virtual {v10, v4, v1, v3, v2}, La/e/a/e;->b(La/e/a/i;La/e/a/i;II)V

    :cond_3b
    return-void

    :cond_3c
    :goto_1f
    move v5, v0

    move v3, v1

    move v6, v2

    move-object v1, v9

    move-object v0, v11

    move-object v4, v12

    const/4 v2, 0x6

    if-ge v5, v6, :cond_3d

    if-eqz p2, :cond_3d

    invoke-virtual {v10, v15, v0, v3, v2}, La/e/a/e;->b(La/e/a/i;La/e/a/i;II)V

    invoke-virtual {v10, v4, v1, v3, v2}, La/e/a/e;->b(La/e/a/i;La/e/a/i;II)V

    :cond_3d
    return-void
.end method

.method private t(I)Z
    .locals 4

    mul-int/lit8 p1, p1, 0x2

    iget-object v0, p0, La/e/a/a/h;->D:[La/e/a/a/f;

    aget-object v1, v0, p1

    iget-object v1, v1, La/e/a/a/f;->d:La/e/a/a/f;

    const/4 v2, 0x1

    if-eqz v1, :cond_0

    aget-object v1, v0, p1

    iget-object v1, v1, La/e/a/a/f;->d:La/e/a/a/f;

    iget-object v1, v1, La/e/a/a/f;->d:La/e/a/a/f;

    aget-object v3, v0, p1

    if-eq v1, v3, :cond_0

    add-int/2addr p1, v2

    aget-object v1, v0, p1

    iget-object v1, v1, La/e/a/a/f;->d:La/e/a/a/f;

    if-eqz v1, :cond_0

    aget-object v1, v0, p1

    iget-object v1, v1, La/e/a/a/f;->d:La/e/a/a/f;

    iget-object v1, v1, La/e/a/a/f;->d:La/e/a/a/f;

    aget-object p1, v0, p1

    if-ne v1, p1, :cond_0

    goto :goto_0

    :cond_0
    const/4 v2, 0x0

    :goto_0
    return v2
.end method


# virtual methods
.method public A()Z
    .locals 2

    iget-object v0, p0, La/e/a/a/h;->w:La/e/a/a/f;

    iget-object v1, v0, La/e/a/a/f;->d:La/e/a/a/f;

    if-eqz v1, :cond_0

    iget-object v1, v1, La/e/a/a/f;->d:La/e/a/a/f;

    if-eq v1, v0, :cond_1

    :cond_0
    iget-object v0, p0, La/e/a/a/h;->y:La/e/a/a/f;

    iget-object v1, v0, La/e/a/a/f;->d:La/e/a/a/f;

    if-eqz v1, :cond_2

    iget-object v1, v1, La/e/a/a/f;->d:La/e/a/a/f;

    if-ne v1, v0, :cond_2

    :cond_1
    const/4 v0, 0x1

    return v0

    :cond_2
    const/4 v0, 0x0

    return v0
.end method

.method public B()Z
    .locals 3

    iget v0, p0, La/e/a/a/h;->g:I

    const/4 v1, 0x1

    if-nez v0, :cond_0

    iget v0, p0, La/e/a/a/h;->J:F

    const/4 v2, 0x0

    cmpl-float v0, v0, v2

    if-nez v0, :cond_0

    iget v0, p0, La/e/a/a/h;->l:I

    if-nez v0, :cond_0

    iget v0, p0, La/e/a/a/h;->m:I

    if-nez v0, :cond_0

    iget-object v0, p0, La/e/a/a/h;->F:[La/e/a/a/h$a;

    aget-object v0, v0, v1

    sget-object v2, La/e/a/a/h$a;->c:La/e/a/a/h$a;

    if-ne v0, v2, :cond_0

    goto :goto_0

    :cond_0
    const/4 v1, 0x0

    :goto_0
    return v1
.end method

.method public C()Z
    .locals 3

    iget v0, p0, La/e/a/a/h;->f:I

    const/4 v1, 0x0

    if-nez v0, :cond_0

    iget v0, p0, La/e/a/a/h;->J:F

    const/4 v2, 0x0

    cmpl-float v0, v0, v2

    if-nez v0, :cond_0

    iget v0, p0, La/e/a/a/h;->i:I

    if-nez v0, :cond_0

    iget v0, p0, La/e/a/a/h;->j:I

    if-nez v0, :cond_0

    iget-object v0, p0, La/e/a/a/h;->F:[La/e/a/a/h$a;

    aget-object v0, v0, v1

    sget-object v2, La/e/a/a/h$a;->c:La/e/a/a/h$a;

    if-ne v0, v2, :cond_0

    const/4 v1, 0x1

    :cond_0
    return v1
.end method

.method public D()V
    .locals 6

    iget-object v0, p0, La/e/a/a/h;->v:La/e/a/a/f;

    invoke-virtual {v0}, La/e/a/a/f;->j()V

    iget-object v0, p0, La/e/a/a/h;->w:La/e/a/a/f;

    invoke-virtual {v0}, La/e/a/a/f;->j()V

    iget-object v0, p0, La/e/a/a/h;->x:La/e/a/a/f;

    invoke-virtual {v0}, La/e/a/a/f;->j()V

    iget-object v0, p0, La/e/a/a/h;->y:La/e/a/a/f;

    invoke-virtual {v0}, La/e/a/a/f;->j()V

    iget-object v0, p0, La/e/a/a/h;->z:La/e/a/a/f;

    invoke-virtual {v0}, La/e/a/a/f;->j()V

    iget-object v0, p0, La/e/a/a/h;->A:La/e/a/a/f;

    invoke-virtual {v0}, La/e/a/a/f;->j()V

    iget-object v0, p0, La/e/a/a/h;->B:La/e/a/a/f;

    invoke-virtual {v0}, La/e/a/a/f;->j()V

    iget-object v0, p0, La/e/a/a/h;->C:La/e/a/a/f;

    invoke-virtual {v0}, La/e/a/a/f;->j()V

    const/4 v0, 0x0

    iput-object v0, p0, La/e/a/a/h;->G:La/e/a/a/h;

    const/4 v1, 0x0

    iput v1, p0, La/e/a/a/h;->u:F

    const/4 v2, 0x0

    iput v2, p0, La/e/a/a/h;->H:I

    iput v2, p0, La/e/a/a/h;->I:I

    iput v1, p0, La/e/a/a/h;->J:F

    const/4 v1, -0x1

    iput v1, p0, La/e/a/a/h;->K:I

    iput v2, p0, La/e/a/a/h;->L:I

    iput v2, p0, La/e/a/a/h;->M:I

    iput v2, p0, La/e/a/a/h;->P:I

    iput v2, p0, La/e/a/a/h;->Q:I

    iput v2, p0, La/e/a/a/h;->R:I

    iput v2, p0, La/e/a/a/h;->S:I

    iput v2, p0, La/e/a/a/h;->T:I

    iput v2, p0, La/e/a/a/h;->U:I

    iput v2, p0, La/e/a/a/h;->V:I

    iput v2, p0, La/e/a/a/h;->W:I

    iput v2, p0, La/e/a/a/h;->X:I

    iput v2, p0, La/e/a/a/h;->Y:I

    iput v2, p0, La/e/a/a/h;->Z:I

    sget v3, La/e/a/a/h;->a:F

    iput v3, p0, La/e/a/a/h;->aa:F

    iput v3, p0, La/e/a/a/h;->ba:F

    iget-object v3, p0, La/e/a/a/h;->F:[La/e/a/a/h$a;

    sget-object v4, La/e/a/a/h$a;->a:La/e/a/a/h$a;

    aput-object v4, v3, v2

    const/4 v5, 0x1

    aput-object v4, v3, v5

    iput-object v0, p0, La/e/a/a/h;->ca:Ljava/lang/Object;

    iput v2, p0, La/e/a/a/h;->da:I

    iput v2, p0, La/e/a/a/h;->ea:I

    iput-object v0, p0, La/e/a/a/h;->ga:Ljava/lang/String;

    iput-boolean v2, p0, La/e/a/a/h;->ha:Z

    iput-boolean v2, p0, La/e/a/a/h;->ia:Z

    iput v2, p0, La/e/a/a/h;->ma:I

    iput v2, p0, La/e/a/a/h;->na:I

    iput-boolean v2, p0, La/e/a/a/h;->oa:Z

    iput-boolean v2, p0, La/e/a/a/h;->pa:Z

    iget-object v3, p0, La/e/a/a/h;->qa:[F

    const/high16 v4, -0x40800000    # -1.0f

    aput v4, v3, v2

    aput v4, v3, v5

    iput v1, p0, La/e/a/a/h;->b:I

    iput v1, p0, La/e/a/a/h;->c:I

    iget-object v3, p0, La/e/a/a/h;->t:[I

    const v4, 0x7fffffff

    aput v4, v3, v2

    aput v4, v3, v5

    iput v2, p0, La/e/a/a/h;->f:I

    iput v2, p0, La/e/a/a/h;->g:I

    const/high16 v3, 0x3f800000    # 1.0f

    iput v3, p0, La/e/a/a/h;->k:F

    iput v3, p0, La/e/a/a/h;->n:F

    iput v4, p0, La/e/a/a/h;->j:I

    iput v4, p0, La/e/a/a/h;->m:I

    iput v2, p0, La/e/a/a/h;->i:I

    iput v2, p0, La/e/a/a/h;->l:I

    iput v1, p0, La/e/a/a/h;->q:I

    iput v3, p0, La/e/a/a/h;->r:F

    iget-object v1, p0, La/e/a/a/h;->d:La/e/a/a/q;

    if-eqz v1, :cond_0

    invoke-virtual {v1}, La/e/a/a/q;->d()V

    :cond_0
    iget-object v1, p0, La/e/a/a/h;->e:La/e/a/a/q;

    if-eqz v1, :cond_1

    invoke-virtual {v1}, La/e/a/a/q;->d()V

    :cond_1
    iput-object v0, p0, La/e/a/a/h;->s:La/e/a/a/j;

    iput-boolean v2, p0, La/e/a/a/h;->ja:Z

    iput-boolean v2, p0, La/e/a/a/h;->ka:Z

    iput-boolean v2, p0, La/e/a/a/h;->la:Z

    return-void
.end method

.method public E()V
    .locals 3

    invoke-virtual {p0}, La/e/a/a/h;->k()La/e/a/a/h;

    move-result-object v0

    if-eqz v0, :cond_0

    instance-of v0, v0, La/e/a/a/i;

    if-eqz v0, :cond_0

    invoke-virtual {p0}, La/e/a/a/h;->k()La/e/a/a/h;

    move-result-object v0

    check-cast v0, La/e/a/a/i;

    invoke-virtual {v0}, La/e/a/a/i;->N()Z

    move-result v0

    if-eqz v0, :cond_0

    return-void

    :cond_0
    const/4 v0, 0x0

    iget-object v1, p0, La/e/a/a/h;->E:Ljava/util/ArrayList;

    invoke-virtual {v1}, Ljava/util/ArrayList;->size()I

    move-result v1

    :goto_0
    if-ge v0, v1, :cond_1

    iget-object v2, p0, La/e/a/a/h;->E:Ljava/util/ArrayList;

    invoke-virtual {v2, v0}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v2

    check-cast v2, La/e/a/a/f;

    invoke-virtual {v2}, La/e/a/a/f;->j()V

    add-int/lit8 v0, v0, 0x1

    goto :goto_0

    :cond_1
    return-void
.end method

.method public F()V
    .locals 2

    const/4 v0, 0x0

    :goto_0
    const/4 v1, 0x6

    if-ge v0, v1, :cond_0

    iget-object v1, p0, La/e/a/a/h;->D:[La/e/a/a/f;

    aget-object v1, v1, v0

    invoke-virtual {v1}, La/e/a/a/f;->d()La/e/a/a/p;

    move-result-object v1

    invoke-virtual {v1}, La/e/a/a/p;->d()V

    add-int/lit8 v0, v0, 0x1

    goto :goto_0

    :cond_0
    return-void
.end method

.method public G()V
    .locals 0

    return-void
.end method

.method public H()V
    .locals 4

    iget v0, p0, La/e/a/a/h;->L:I

    iget v1, p0, La/e/a/a/h;->M:I

    iget v2, p0, La/e/a/a/h;->H:I

    add-int/2addr v2, v0

    iget v3, p0, La/e/a/a/h;->I:I

    add-int/2addr v3, v1

    iput v0, p0, La/e/a/a/h;->P:I

    iput v1, p0, La/e/a/a/h;->Q:I

    sub-int/2addr v2, v0

    iput v2, p0, La/e/a/a/h;->R:I

    sub-int/2addr v3, v1

    iput v3, p0, La/e/a/a/h;->S:I

    return-void
.end method

.method public I()V
    .locals 2

    const/4 v0, 0x0

    :goto_0
    const/4 v1, 0x6

    if-ge v0, v1, :cond_0

    iget-object v1, p0, La/e/a/a/h;->D:[La/e/a/a/f;

    aget-object v1, v1, v0

    invoke-virtual {v1}, La/e/a/a/f;->d()La/e/a/a/p;

    move-result-object v1

    invoke-virtual {v1}, La/e/a/a/p;->g()V

    add-int/lit8 v0, v0, 0x1

    goto :goto_0

    :cond_0
    return-void
.end method

.method public a(La/e/a/a/f$c;)La/e/a/a/f;
    .locals 2

    sget-object v0, La/e/a/a/g;->a:[I

    invoke-virtual {p1}, Ljava/lang/Enum;->ordinal()I

    move-result v1

    aget v0, v0, v1

    packed-switch v0, :pswitch_data_0

    new-instance v0, Ljava/lang/AssertionError;

    invoke-virtual {p1}, Ljava/lang/Enum;->name()Ljava/lang/String;

    move-result-object p1

    invoke-direct {v0, p1}, Ljava/lang/AssertionError;-><init>(Ljava/lang/Object;)V

    throw v0

    :pswitch_0
    const/4 p1, 0x0

    return-object p1

    :pswitch_1
    iget-object p1, p0, La/e/a/a/h;->B:La/e/a/a/f;

    return-object p1

    :pswitch_2
    iget-object p1, p0, La/e/a/a/h;->A:La/e/a/a/f;

    return-object p1

    :pswitch_3
    iget-object p1, p0, La/e/a/a/h;->C:La/e/a/a/f;

    return-object p1

    :pswitch_4
    iget-object p1, p0, La/e/a/a/h;->z:La/e/a/a/f;

    return-object p1

    :pswitch_5
    iget-object p1, p0, La/e/a/a/h;->y:La/e/a/a/f;

    return-object p1

    :pswitch_6
    iget-object p1, p0, La/e/a/a/h;->x:La/e/a/a/f;

    return-object p1

    :pswitch_7
    iget-object p1, p0, La/e/a/a/h;->w:La/e/a/a/f;

    return-object p1

    :pswitch_8
    iget-object p1, p0, La/e/a/a/h;->v:La/e/a/a/f;

    return-object p1

    nop

    :pswitch_data_0
    .packed-switch 0x1
        :pswitch_8
        :pswitch_7
        :pswitch_6
        :pswitch_5
        :pswitch_4
        :pswitch_3
        :pswitch_2
        :pswitch_1
        :pswitch_0
    .end packed-switch
.end method

.method public a(F)V
    .locals 0

    iput p1, p0, La/e/a/a/h;->aa:F

    return-void
.end method

.method public a(I)V
    .locals 0

    invoke-static {p1, p0}, La/e/a/a/n;->a(ILa/e/a/a/h;)V

    return-void
.end method

.method public a(II)V
    .locals 0

    iput p1, p0, La/e/a/a/h;->L:I

    sub-int/2addr p2, p1

    iput p2, p0, La/e/a/a/h;->H:I

    iget p1, p0, La/e/a/a/h;->H:I

    iget p2, p0, La/e/a/a/h;->W:I

    if-ge p1, p2, :cond_0

    iput p2, p0, La/e/a/a/h;->H:I

    :cond_0
    return-void
.end method

.method public a(III)V
    .locals 1

    const/4 v0, 0x1

    if-nez p3, :cond_0

    invoke-virtual {p0, p1, p2}, La/e/a/a/h;->a(II)V

    goto :goto_0

    :cond_0
    if-ne p3, v0, :cond_1

    invoke-virtual {p0, p1, p2}, La/e/a/a/h;->e(II)V

    :cond_1
    :goto_0
    iput-boolean v0, p0, La/e/a/a/h;->ka:Z

    return-void
.end method

.method public a(IIIF)V
    .locals 0

    iput p1, p0, La/e/a/a/h;->f:I

    iput p2, p0, La/e/a/a/h;->i:I

    iput p3, p0, La/e/a/a/h;->j:I

    iput p4, p0, La/e/a/a/h;->k:F

    const/high16 p1, 0x3f800000    # 1.0f

    cmpg-float p1, p4, p1

    if-gez p1, :cond_0

    iget p1, p0, La/e/a/a/h;->f:I

    if-nez p1, :cond_0

    const/4 p1, 0x2

    iput p1, p0, La/e/a/a/h;->f:I

    :cond_0
    return-void
.end method

.method public a(IIII)V
    .locals 1

    sub-int/2addr p3, p1

    sub-int/2addr p4, p2

    iput p1, p0, La/e/a/a/h;->L:I

    iput p2, p0, La/e/a/a/h;->M:I

    iget p1, p0, La/e/a/a/h;->ea:I

    const/4 p2, 0x0

    const/16 v0, 0x8

    if-ne p1, v0, :cond_0

    iput p2, p0, La/e/a/a/h;->H:I

    iput p2, p0, La/e/a/a/h;->I:I

    return-void

    :cond_0
    iget-object p1, p0, La/e/a/a/h;->F:[La/e/a/a/h$a;

    aget-object p1, p1, p2

    sget-object p2, La/e/a/a/h$a;->a:La/e/a/a/h$a;

    if-ne p1, p2, :cond_1

    iget p1, p0, La/e/a/a/h;->H:I

    if-ge p3, p1, :cond_1

    goto :goto_0

    :cond_1
    move p1, p3

    :goto_0
    iget-object p2, p0, La/e/a/a/h;->F:[La/e/a/a/h$a;

    const/4 p3, 0x1

    aget-object p2, p2, p3

    sget-object v0, La/e/a/a/h$a;->a:La/e/a/a/h$a;

    if-ne p2, v0, :cond_2

    iget p2, p0, La/e/a/a/h;->I:I

    if-ge p4, p2, :cond_2

    goto :goto_1

    :cond_2
    move p2, p4

    :goto_1
    iput p1, p0, La/e/a/a/h;->H:I

    iput p2, p0, La/e/a/a/h;->I:I

    iget p1, p0, La/e/a/a/h;->I:I

    iget p2, p0, La/e/a/a/h;->X:I

    if-ge p1, p2, :cond_3

    iput p2, p0, La/e/a/a/h;->I:I

    :cond_3
    iget p1, p0, La/e/a/a/h;->H:I

    iget p2, p0, La/e/a/a/h;->W:I

    if-ge p1, p2, :cond_4

    iput p2, p0, La/e/a/a/h;->H:I

    :cond_4
    iput-boolean p3, p0, La/e/a/a/h;->ka:Z

    return-void
.end method

.method public a(La/e/a/a/f$c;La/e/a/a/h;La/e/a/a/f$c;II)V
    .locals 7

    invoke-virtual {p0, p1}, La/e/a/a/h;->a(La/e/a/a/f$c;)La/e/a/a/f;

    move-result-object v0

    invoke-virtual {p2, p3}, La/e/a/a/h;->a(La/e/a/a/f$c;)La/e/a/a/f;

    move-result-object v1

    sget-object v4, La/e/a/a/f$b;->b:La/e/a/a/f$b;

    const/4 v5, 0x0

    const/4 v6, 0x1

    move v2, p4

    move v3, p5

    invoke-virtual/range {v0 .. v6}, La/e/a/a/f;->a(La/e/a/a/f;IILa/e/a/a/f$b;IZ)Z

    return-void
.end method

.method public a(La/e/a/a/h$a;)V
    .locals 2

    iget-object v0, p0, La/e/a/a/h;->F:[La/e/a/a/h$a;

    const/4 v1, 0x0

    aput-object p1, v0, v1

    sget-object v0, La/e/a/a/h$a;->b:La/e/a/a/h$a;

    if-ne p1, v0, :cond_0

    iget p1, p0, La/e/a/a/h;->Y:I

    invoke-virtual {p0, p1}, La/e/a/a/h;->o(I)V

    :cond_0
    return-void
.end method

.method public a(La/e/a/a/h;)V
    .locals 0

    iput-object p1, p0, La/e/a/a/h;->G:La/e/a/a/h;

    return-void
.end method

.method public a(La/e/a/a/h;FI)V
    .locals 6

    sget-object v3, La/e/a/a/f$c;->g:La/e/a/a/f$c;

    const/4 v5, 0x0

    move-object v0, p0

    move-object v1, v3

    move-object v2, p1

    move v4, p3

    invoke-virtual/range {v0 .. v5}, La/e/a/a/h;->a(La/e/a/a/f$c;La/e/a/a/h;La/e/a/a/f$c;II)V

    iput p2, p0, La/e/a/a/h;->u:F

    return-void
.end method

.method public a(La/e/a/c;)V
    .locals 1

    iget-object v0, p0, La/e/a/a/h;->v:La/e/a/a/f;

    invoke-virtual {v0, p1}, La/e/a/a/f;->a(La/e/a/c;)V

    iget-object v0, p0, La/e/a/a/h;->w:La/e/a/a/f;

    invoke-virtual {v0, p1}, La/e/a/a/f;->a(La/e/a/c;)V

    iget-object v0, p0, La/e/a/a/h;->x:La/e/a/a/f;

    invoke-virtual {v0, p1}, La/e/a/a/f;->a(La/e/a/c;)V

    iget-object v0, p0, La/e/a/a/h;->y:La/e/a/a/f;

    invoke-virtual {v0, p1}, La/e/a/a/f;->a(La/e/a/c;)V

    iget-object v0, p0, La/e/a/a/h;->z:La/e/a/a/f;

    invoke-virtual {v0, p1}, La/e/a/a/f;->a(La/e/a/c;)V

    iget-object v0, p0, La/e/a/a/h;->C:La/e/a/a/f;

    invoke-virtual {v0, p1}, La/e/a/a/f;->a(La/e/a/c;)V

    iget-object v0, p0, La/e/a/a/h;->A:La/e/a/a/f;

    invoke-virtual {v0, p1}, La/e/a/a/f;->a(La/e/a/c;)V

    iget-object v0, p0, La/e/a/a/h;->B:La/e/a/a/f;

    invoke-virtual {v0, p1}, La/e/a/a/f;->a(La/e/a/c;)V

    return-void
.end method

.method public a(La/e/a/e;)V
    .locals 38

    move-object/from16 v15, p0

    move-object/from16 v14, p1

    iget-object v0, v15, La/e/a/a/h;->v:La/e/a/a/f;

    invoke-virtual {v14, v0}, La/e/a/e;->a(Ljava/lang/Object;)La/e/a/i;

    move-result-object v21

    iget-object v0, v15, La/e/a/a/h;->x:La/e/a/a/f;

    invoke-virtual {v14, v0}, La/e/a/e;->a(Ljava/lang/Object;)La/e/a/i;

    move-result-object v10

    iget-object v0, v15, La/e/a/a/h;->w:La/e/a/a/f;

    invoke-virtual {v14, v0}, La/e/a/e;->a(Ljava/lang/Object;)La/e/a/i;

    move-result-object v6

    iget-object v0, v15, La/e/a/a/h;->y:La/e/a/a/f;

    invoke-virtual {v14, v0}, La/e/a/e;->a(Ljava/lang/Object;)La/e/a/i;

    move-result-object v4

    iget-object v0, v15, La/e/a/a/h;->z:La/e/a/a/f;

    invoke-virtual {v14, v0}, La/e/a/e;->a(Ljava/lang/Object;)La/e/a/i;

    move-result-object v3

    iget-object v0, v15, La/e/a/a/h;->G:La/e/a/a/h;

    const/16 v1, 0x8

    const/4 v2, 0x1

    const/4 v13, 0x0

    if-eqz v0, :cond_6

    if-eqz v0, :cond_0

    iget-object v0, v0, La/e/a/a/h;->F:[La/e/a/a/h$a;

    aget-object v0, v0, v13

    sget-object v5, La/e/a/a/h$a;->b:La/e/a/a/h$a;

    if-ne v0, v5, :cond_0

    move v0, v2

    goto :goto_0

    :cond_0
    move v0, v13

    :goto_0
    iget-object v5, v15, La/e/a/a/h;->G:La/e/a/a/h;

    if-eqz v5, :cond_1

    iget-object v5, v5, La/e/a/a/h;->F:[La/e/a/a/h$a;

    aget-object v5, v5, v2

    sget-object v7, La/e/a/a/h$a;->b:La/e/a/a/h$a;

    if-ne v5, v7, :cond_1

    move v5, v2

    goto :goto_1

    :cond_1
    move v5, v13

    :goto_1
    invoke-direct {v15, v13}, La/e/a/a/h;->t(I)Z

    move-result v7

    if-eqz v7, :cond_2

    iget-object v7, v15, La/e/a/a/h;->G:La/e/a/a/h;

    check-cast v7, La/e/a/a/i;

    invoke-virtual {v7, v15, v13}, La/e/a/a/i;->a(La/e/a/a/h;I)V

    move v7, v2

    goto :goto_2

    :cond_2
    invoke-virtual/range {p0 .. p0}, La/e/a/a/h;->z()Z

    move-result v7

    :goto_2
    invoke-direct {v15, v2}, La/e/a/a/h;->t(I)Z

    move-result v8

    if-eqz v8, :cond_3

    iget-object v8, v15, La/e/a/a/h;->G:La/e/a/a/h;

    check-cast v8, La/e/a/a/i;

    invoke-virtual {v8, v15, v2}, La/e/a/a/i;->a(La/e/a/a/h;I)V

    move v8, v2

    goto :goto_3

    :cond_3
    invoke-virtual/range {p0 .. p0}, La/e/a/a/h;->A()Z

    move-result v8

    :goto_3
    if-eqz v0, :cond_4

    iget v9, v15, La/e/a/a/h;->ea:I

    if-eq v9, v1, :cond_4

    iget-object v9, v15, La/e/a/a/h;->v:La/e/a/a/f;

    iget-object v9, v9, La/e/a/a/f;->d:La/e/a/a/f;

    if-nez v9, :cond_4

    iget-object v9, v15, La/e/a/a/h;->x:La/e/a/a/f;

    iget-object v9, v9, La/e/a/a/f;->d:La/e/a/a/f;

    if-nez v9, :cond_4

    iget-object v9, v15, La/e/a/a/h;->G:La/e/a/a/h;

    iget-object v9, v9, La/e/a/a/h;->x:La/e/a/a/f;

    invoke-virtual {v14, v9}, La/e/a/e;->a(Ljava/lang/Object;)La/e/a/i;

    move-result-object v9

    invoke-virtual {v14, v9, v10, v13, v2}, La/e/a/e;->b(La/e/a/i;La/e/a/i;II)V

    :cond_4
    if-eqz v5, :cond_5

    iget v9, v15, La/e/a/a/h;->ea:I

    if-eq v9, v1, :cond_5

    iget-object v9, v15, La/e/a/a/h;->w:La/e/a/a/f;

    iget-object v9, v9, La/e/a/a/f;->d:La/e/a/a/f;

    if-nez v9, :cond_5

    iget-object v9, v15, La/e/a/a/h;->y:La/e/a/a/f;

    iget-object v9, v9, La/e/a/a/f;->d:La/e/a/a/f;

    if-nez v9, :cond_5

    iget-object v9, v15, La/e/a/a/h;->z:La/e/a/a/f;

    if-nez v9, :cond_5

    iget-object v9, v15, La/e/a/a/h;->G:La/e/a/a/h;

    iget-object v9, v9, La/e/a/a/h;->y:La/e/a/a/f;

    invoke-virtual {v14, v9}, La/e/a/e;->a(Ljava/lang/Object;)La/e/a/i;

    move-result-object v9

    invoke-virtual {v14, v9, v4, v13, v2}, La/e/a/e;->b(La/e/a/i;La/e/a/i;II)V

    :cond_5
    move v12, v5

    move/from16 v16, v7

    move/from16 v22, v8

    goto :goto_4

    :cond_6
    move v0, v13

    move v12, v0

    move/from16 v16, v12

    move/from16 v22, v16

    :goto_4
    iget v5, v15, La/e/a/a/h;->H:I

    iget v7, v15, La/e/a/a/h;->W:I

    if-ge v5, v7, :cond_7

    move v5, v7

    :cond_7
    iget v7, v15, La/e/a/a/h;->I:I

    iget v8, v15, La/e/a/a/h;->X:I

    if-ge v7, v8, :cond_8

    move v7, v8

    :cond_8
    iget-object v8, v15, La/e/a/a/h;->F:[La/e/a/a/h$a;

    aget-object v8, v8, v13

    sget-object v9, La/e/a/a/h$a;->c:La/e/a/a/h$a;

    if-eq v8, v9, :cond_9

    move v8, v2

    goto :goto_5

    :cond_9
    move v8, v13

    :goto_5
    iget-object v9, v15, La/e/a/a/h;->F:[La/e/a/a/h$a;

    aget-object v9, v9, v2

    sget-object v11, La/e/a/a/h$a;->c:La/e/a/a/h$a;

    if-eq v9, v11, :cond_a

    move v9, v2

    goto :goto_6

    :cond_a
    move v9, v13

    :goto_6
    iget v11, v15, La/e/a/a/h;->K:I

    iput v11, v15, La/e/a/a/h;->q:I

    iget v11, v15, La/e/a/a/h;->J:F

    iput v11, v15, La/e/a/a/h;->r:F

    iget v2, v15, La/e/a/a/h;->f:I

    iget v13, v15, La/e/a/a/h;->g:I

    const/16 v18, 0x0

    cmpl-float v11, v11, v18

    const/16 v18, 0x4

    if-lez v11, :cond_14

    iget v11, v15, La/e/a/a/h;->ea:I

    const/16 v1, 0x8

    if-eq v11, v1, :cond_14

    iget-object v1, v15, La/e/a/a/h;->F:[La/e/a/a/h$a;

    const/4 v11, 0x0

    aget-object v1, v1, v11

    sget-object v11, La/e/a/a/h$a;->c:La/e/a/a/h$a;

    move-object/from16 v24, v3

    if-ne v1, v11, :cond_b

    if-nez v2, :cond_b

    const/4 v2, 0x3

    :cond_b
    iget-object v1, v15, La/e/a/a/h;->F:[La/e/a/a/h$a;

    const/4 v11, 0x1

    aget-object v1, v1, v11

    sget-object v11, La/e/a/a/h$a;->c:La/e/a/a/h$a;

    if-ne v1, v11, :cond_c

    if-nez v13, :cond_c

    const/4 v13, 0x3

    :cond_c
    iget-object v1, v15, La/e/a/a/h;->F:[La/e/a/a/h$a;

    const/4 v11, 0x0

    aget-object v3, v1, v11

    sget-object v11, La/e/a/a/h$a;->c:La/e/a/a/h$a;

    if-ne v3, v11, :cond_d

    const/4 v3, 0x1

    aget-object v1, v1, v3

    if-ne v1, v11, :cond_d

    const/4 v1, 0x3

    if-ne v2, v1, :cond_e

    if-ne v13, v1, :cond_e

    invoke-virtual {v15, v0, v12, v8, v9}, La/e/a/a/h;->a(ZZZZ)V

    goto/16 :goto_7

    :cond_d
    const/4 v1, 0x3

    :cond_e
    iget-object v3, v15, La/e/a/a/h;->F:[La/e/a/a/h$a;

    const/4 v8, 0x0

    aget-object v9, v3, v8

    sget-object v11, La/e/a/a/h$a;->c:La/e/a/a/h$a;

    if-ne v9, v11, :cond_10

    if-ne v2, v1, :cond_10

    iput v8, v15, La/e/a/a/h;->q:I

    iget v1, v15, La/e/a/a/h;->r:F

    iget v5, v15, La/e/a/a/h;->I:I

    int-to-float v5, v5

    mul-float/2addr v1, v5

    float-to-int v1, v1

    const/4 v8, 0x1

    aget-object v3, v3, v8

    if-eq v3, v11, :cond_f

    move/from16 v28, v1

    move/from16 v29, v7

    move/from16 v26, v13

    move/from16 v25, v18

    goto :goto_9

    :cond_f
    move/from16 v28, v1

    move/from16 v25, v2

    move/from16 v29, v7

    move/from16 v27, v8

    move/from16 v26, v13

    goto :goto_a

    :cond_10
    const/4 v8, 0x1

    iget-object v1, v15, La/e/a/a/h;->F:[La/e/a/a/h$a;

    aget-object v1, v1, v8

    sget-object v3, La/e/a/a/h$a;->c:La/e/a/a/h$a;

    if-ne v1, v3, :cond_13

    const/4 v1, 0x3

    if-ne v13, v1, :cond_13

    iput v8, v15, La/e/a/a/h;->q:I

    iget v1, v15, La/e/a/a/h;->K:I

    const/4 v3, -0x1

    if-ne v1, v3, :cond_11

    const/high16 v1, 0x3f800000    # 1.0f

    iget v3, v15, La/e/a/a/h;->r:F

    div-float/2addr v1, v3

    iput v1, v15, La/e/a/a/h;->r:F

    :cond_11
    iget v1, v15, La/e/a/a/h;->r:F

    iget v3, v15, La/e/a/a/h;->H:I

    int-to-float v3, v3

    mul-float/2addr v1, v3

    float-to-int v1, v1

    iget-object v3, v15, La/e/a/a/h;->F:[La/e/a/a/h$a;

    const/4 v7, 0x0

    aget-object v3, v3, v7

    sget-object v7, La/e/a/a/h$a;->c:La/e/a/a/h$a;

    if-eq v3, v7, :cond_12

    move/from16 v29, v1

    move/from16 v25, v2

    move/from16 v28, v5

    move/from16 v26, v18

    goto :goto_9

    :cond_12
    move/from16 v29, v1

    move/from16 v25, v2

    move/from16 v28, v5

    goto :goto_8

    :cond_13
    :goto_7
    move/from16 v25, v2

    move/from16 v28, v5

    move/from16 v29, v7

    :goto_8
    move/from16 v26, v13

    const/16 v27, 0x1

    goto :goto_a

    :cond_14
    move-object/from16 v24, v3

    move/from16 v25, v2

    move/from16 v28, v5

    move/from16 v29, v7

    move/from16 v26, v13

    :goto_9
    const/16 v27, 0x0

    :goto_a
    iget-object v1, v15, La/e/a/a/h;->h:[I

    const/4 v2, 0x0

    aput v25, v1, v2

    const/4 v2, 0x1

    aput v26, v1, v2

    if-eqz v27, :cond_16

    iget v1, v15, La/e/a/a/h;->q:I

    if-eqz v1, :cond_15

    const/4 v2, -0x1

    if-ne v1, v2, :cond_17

    goto :goto_b

    :cond_15
    const/4 v2, -0x1

    :goto_b
    const/16 v23, 0x1

    goto :goto_c

    :cond_16
    const/4 v2, -0x1

    :cond_17
    const/16 v23, 0x0

    :goto_c
    iget-object v1, v15, La/e/a/a/h;->F:[La/e/a/a/h$a;

    const/4 v3, 0x0

    aget-object v1, v1, v3

    sget-object v3, La/e/a/a/h$a;->b:La/e/a/a/h$a;

    if-ne v1, v3, :cond_18

    instance-of v1, v15, La/e/a/a/i;

    if-eqz v1, :cond_18

    const/16 v30, 0x1

    goto :goto_d

    :cond_18
    const/16 v30, 0x0

    :goto_d
    iget-object v1, v15, La/e/a/a/h;->C:La/e/a/a/f;

    invoke-virtual {v1}, La/e/a/a/f;->i()Z

    move-result v1

    const/4 v3, 0x1

    xor-int/lit8 v31, v1, 0x1

    iget v1, v15, La/e/a/a/h;->b:I

    const/4 v13, 0x2

    const/16 v32, 0x0

    if-eq v1, v13, :cond_1b

    iget-object v1, v15, La/e/a/a/h;->G:La/e/a/a/h;

    if-eqz v1, :cond_19

    iget-object v1, v1, La/e/a/a/h;->x:La/e/a/a/f;

    invoke-virtual {v14, v1}, La/e/a/e;->a(Ljava/lang/Object;)La/e/a/i;

    move-result-object v1

    move-object/from16 v20, v1

    goto :goto_e

    :cond_19
    move-object/from16 v20, v32

    :goto_e
    iget-object v1, v15, La/e/a/a/h;->G:La/e/a/a/h;

    if-eqz v1, :cond_1a

    iget-object v1, v1, La/e/a/a/h;->v:La/e/a/a/f;

    invoke-virtual {v14, v1}, La/e/a/e;->a(Ljava/lang/Object;)La/e/a/i;

    move-result-object v1

    move-object/from16 v33, v1

    goto :goto_f

    :cond_1a
    move-object/from16 v33, v32

    :goto_f
    iget-object v1, v15, La/e/a/a/h;->F:[La/e/a/a/h$a;

    const/16 v17, 0x0

    aget-object v5, v1, v17

    iget-object v7, v15, La/e/a/a/h;->v:La/e/a/a/f;

    iget-object v8, v15, La/e/a/a/h;->x:La/e/a/a/f;

    iget v9, v15, La/e/a/a/h;->L:I

    iget v11, v15, La/e/a/a/h;->W:I

    iget-object v1, v15, La/e/a/a/h;->t:[I

    aget v1, v1, v17

    move/from16 v34, v12

    move v12, v1

    iget v1, v15, La/e/a/a/h;->aa:F

    move v13, v1

    iget v1, v15, La/e/a/a/h;->i:I

    move/from16 v17, v1

    iget v1, v15, La/e/a/a/h;->j:I

    move/from16 v18, v1

    iget v1, v15, La/e/a/a/h;->k:F

    move/from16 v19, v1

    move/from16 v35, v0

    move-object/from16 v0, p0

    move-object/from16 v1, p1

    move v3, v2

    move/from16 v2, v35

    move-object/from16 v36, v24

    move-object/from16 v3, v33

    move-object/from16 v24, v4

    move-object/from16 v4, v20

    move-object/from16 v37, v6

    move/from16 v6, v30

    move-object/from16 v30, v10

    move/from16 v10, v28

    move/from16 v14, v23

    move/from16 v15, v16

    move/from16 v16, v25

    move/from16 v20, v31

    invoke-direct/range {v0 .. v20}, La/e/a/a/h;->a(La/e/a/e;ZLa/e/a/i;La/e/a/i;La/e/a/a/h$a;ZLa/e/a/a/f;La/e/a/a/f;IIIIFZZIIIFZ)V

    goto :goto_10

    :cond_1b
    move-object/from16 v37, v6

    move-object/from16 v30, v10

    move/from16 v34, v12

    move-object/from16 v36, v24

    move-object/from16 v24, v4

    :goto_10
    move-object/from16 v15, p0

    iget v0, v15, La/e/a/a/h;->c:I

    const/4 v1, 0x2

    if-ne v0, v1, :cond_1c

    return-void

    :cond_1c
    iget-object v0, v15, La/e/a/a/h;->F:[La/e/a/a/h$a;

    const/4 v14, 0x1

    aget-object v0, v0, v14

    sget-object v1, La/e/a/a/h$a;->b:La/e/a/a/h$a;

    if-ne v0, v1, :cond_1d

    instance-of v0, v15, La/e/a/a/i;

    if-eqz v0, :cond_1d

    move v6, v14

    goto :goto_11

    :cond_1d
    const/4 v6, 0x0

    :goto_11
    if-eqz v27, :cond_1f

    iget v0, v15, La/e/a/a/h;->q:I

    if-eq v0, v14, :cond_1e

    const/4 v1, -0x1

    if-ne v0, v1, :cond_1f

    :cond_1e
    move/from16 v16, v14

    goto :goto_12

    :cond_1f
    const/16 v16, 0x0

    :goto_12
    iget v0, v15, La/e/a/a/h;->V:I

    if-lez v0, :cond_21

    iget-object v0, v15, La/e/a/a/h;->z:La/e/a/a/f;

    invoke-virtual {v0}, La/e/a/a/f;->d()La/e/a/a/p;

    move-result-object v0

    iget v0, v0, La/e/a/a/r;->b:I

    if-ne v0, v14, :cond_20

    iget-object v0, v15, La/e/a/a/h;->z:La/e/a/a/f;

    invoke-virtual {v0}, La/e/a/a/f;->d()La/e/a/a/p;

    move-result-object v0

    move-object/from16 v10, p1

    invoke-virtual {v0, v10}, La/e/a/a/p;->a(La/e/a/e;)V

    goto :goto_13

    :cond_20
    move-object/from16 v10, p1

    invoke-virtual/range {p0 .. p0}, La/e/a/a/h;->c()I

    move-result v0

    const/4 v1, 0x6

    move-object/from16 v2, v36

    move-object/from16 v4, v37

    invoke-virtual {v10, v2, v4, v0, v1}, La/e/a/e;->a(La/e/a/i;La/e/a/i;II)La/e/a/b;

    iget-object v0, v15, La/e/a/a/h;->z:La/e/a/a/f;

    iget-object v0, v0, La/e/a/a/f;->d:La/e/a/a/f;

    if-eqz v0, :cond_22

    invoke-virtual {v10, v0}, La/e/a/e;->a(Ljava/lang/Object;)La/e/a/i;

    move-result-object v0

    const/4 v3, 0x0

    invoke-virtual {v10, v2, v0, v3, v1}, La/e/a/e;->a(La/e/a/i;La/e/a/i;II)La/e/a/b;

    move/from16 v20, v3

    goto :goto_14

    :cond_21
    move-object/from16 v10, p1

    :goto_13
    move-object/from16 v4, v37

    :cond_22
    move/from16 v20, v31

    :goto_14
    iget-object v0, v15, La/e/a/a/h;->G:La/e/a/a/h;

    if-eqz v0, :cond_23

    iget-object v0, v0, La/e/a/a/h;->y:La/e/a/a/f;

    invoke-virtual {v10, v0}, La/e/a/e;->a(Ljava/lang/Object;)La/e/a/i;

    move-result-object v0

    move-object/from16 v23, v0

    goto :goto_15

    :cond_23
    move-object/from16 v23, v32

    :goto_15
    iget-object v0, v15, La/e/a/a/h;->G:La/e/a/a/h;

    if-eqz v0, :cond_24

    iget-object v0, v0, La/e/a/a/h;->w:La/e/a/a/f;

    invoke-virtual {v10, v0}, La/e/a/e;->a(Ljava/lang/Object;)La/e/a/i;

    move-result-object v0

    move-object v3, v0

    goto :goto_16

    :cond_24
    move-object/from16 v3, v32

    :goto_16
    iget-object v0, v15, La/e/a/a/h;->F:[La/e/a/a/h$a;

    aget-object v5, v0, v14

    iget-object v7, v15, La/e/a/a/h;->w:La/e/a/a/f;

    iget-object v8, v15, La/e/a/a/h;->y:La/e/a/a/f;

    iget v9, v15, La/e/a/a/h;->M:I

    iget v11, v15, La/e/a/a/h;->X:I

    iget-object v0, v15, La/e/a/a/h;->t:[I

    aget v12, v0, v14

    iget v13, v15, La/e/a/a/h;->ba:F

    iget v0, v15, La/e/a/a/h;->l:I

    move/from16 v17, v0

    iget v0, v15, La/e/a/a/h;->m:I

    move/from16 v18, v0

    iget v0, v15, La/e/a/a/h;->n:F

    move/from16 v19, v0

    move-object/from16 v0, p0

    move-object/from16 v1, p1

    move/from16 v2, v34

    move-object/from16 v25, v4

    move-object/from16 v4, v23

    move/from16 v10, v29

    move/from16 v14, v16

    move/from16 v15, v22

    move/from16 v16, v26

    invoke-direct/range {v0 .. v20}, La/e/a/a/h;->a(La/e/a/e;ZLa/e/a/i;La/e/a/i;La/e/a/a/h$a;ZLa/e/a/a/f;La/e/a/a/f;IIIIFZZIIIFZ)V

    if-eqz v27, :cond_26

    const/4 v6, 0x6

    move-object/from16 v7, p0

    iget v0, v7, La/e/a/a/h;->q:I

    const/4 v1, 0x1

    if-ne v0, v1, :cond_25

    iget v5, v7, La/e/a/a/h;->r:F

    move-object/from16 v0, p1

    move-object/from16 v1, v24

    move-object/from16 v2, v25

    move-object/from16 v3, v30

    move-object/from16 v4, v21

    goto :goto_17

    :cond_25
    iget v5, v7, La/e/a/a/h;->r:F

    const/4 v6, 0x6

    move-object/from16 v0, p1

    move-object/from16 v1, v30

    move-object/from16 v2, v21

    move-object/from16 v3, v24

    move-object/from16 v4, v25

    :goto_17
    invoke-virtual/range {v0 .. v6}, La/e/a/e;->a(La/e/a/i;La/e/a/i;La/e/a/i;La/e/a/i;FI)V

    goto :goto_18

    :cond_26
    move-object/from16 v7, p0

    :goto_18
    iget-object v0, v7, La/e/a/a/h;->C:La/e/a/a/f;

    invoke-virtual {v0}, La/e/a/a/f;->i()Z

    move-result v0

    if-eqz v0, :cond_27

    iget-object v0, v7, La/e/a/a/h;->C:La/e/a/a/f;

    invoke-virtual {v0}, La/e/a/a/f;->g()La/e/a/a/f;

    move-result-object v0

    invoke-virtual {v0}, La/e/a/a/f;->c()La/e/a/a/h;

    move-result-object v0

    iget v1, v7, La/e/a/a/h;->u:F

    const/high16 v2, 0x42b40000    # 90.0f

    add-float/2addr v1, v2

    float-to-double v1, v1

    invoke-static {v1, v2}, Ljava/lang/Math;->toRadians(D)D

    move-result-wide v1

    double-to-float v1, v1

    iget-object v2, v7, La/e/a/a/h;->C:La/e/a/a/f;

    invoke-virtual {v2}, La/e/a/a/f;->b()I

    move-result v2

    move-object/from16 v3, p1

    invoke-virtual {v3, v7, v0, v1, v2}, La/e/a/e;->a(La/e/a/a/h;La/e/a/a/h;FI)V

    :cond_27
    return-void
.end method

.method public a(Ljava/lang/Object;)V
    .locals 0

    iput-object p1, p0, La/e/a/a/h;->ca:Ljava/lang/Object;

    return-void
.end method

.method public a(Ljava/lang/String;)V
    .locals 0

    iput-object p1, p0, La/e/a/a/h;->fa:Ljava/lang/String;

    return-void
.end method

.method public a(Z)V
    .locals 0

    iput-boolean p1, p0, La/e/a/a/h;->p:Z

    return-void
.end method

.method public a(ZZZZ)V
    .locals 5

    iget v0, p0, La/e/a/a/h;->q:I

    const/high16 v1, 0x3f800000    # 1.0f

    const/4 v2, 0x0

    const/4 v3, -0x1

    const/4 v4, 0x1

    if-ne v0, v3, :cond_1

    if-eqz p3, :cond_0

    if-nez p4, :cond_0

    iput v2, p0, La/e/a/a/h;->q:I

    goto :goto_0

    :cond_0
    if-nez p3, :cond_1

    if-eqz p4, :cond_1

    iput v4, p0, La/e/a/a/h;->q:I

    iget p3, p0, La/e/a/a/h;->K:I

    if-ne p3, v3, :cond_1

    iget p3, p0, La/e/a/a/h;->r:F

    div-float p3, v1, p3

    iput p3, p0, La/e/a/a/h;->r:F

    :cond_1
    :goto_0
    iget p3, p0, La/e/a/a/h;->q:I

    if-nez p3, :cond_3

    iget-object p3, p0, La/e/a/a/h;->w:La/e/a/a/f;

    invoke-virtual {p3}, La/e/a/a/f;->i()Z

    move-result p3

    if-eqz p3, :cond_2

    iget-object p3, p0, La/e/a/a/h;->y:La/e/a/a/f;

    invoke-virtual {p3}, La/e/a/a/f;->i()Z

    move-result p3

    if-nez p3, :cond_3

    :cond_2
    iput v4, p0, La/e/a/a/h;->q:I

    goto :goto_1

    :cond_3
    iget p3, p0, La/e/a/a/h;->q:I

    if-ne p3, v4, :cond_5

    iget-object p3, p0, La/e/a/a/h;->v:La/e/a/a/f;

    invoke-virtual {p3}, La/e/a/a/f;->i()Z

    move-result p3

    if-eqz p3, :cond_4

    iget-object p3, p0, La/e/a/a/h;->x:La/e/a/a/f;

    invoke-virtual {p3}, La/e/a/a/f;->i()Z

    move-result p3

    if-nez p3, :cond_5

    :cond_4
    iput v2, p0, La/e/a/a/h;->q:I

    :cond_5
    :goto_1
    iget p3, p0, La/e/a/a/h;->q:I

    if-ne p3, v3, :cond_8

    iget-object p3, p0, La/e/a/a/h;->w:La/e/a/a/f;

    invoke-virtual {p3}, La/e/a/a/f;->i()Z

    move-result p3

    if-eqz p3, :cond_6

    iget-object p3, p0, La/e/a/a/h;->y:La/e/a/a/f;

    invoke-virtual {p3}, La/e/a/a/f;->i()Z

    move-result p3

    if-eqz p3, :cond_6

    iget-object p3, p0, La/e/a/a/h;->v:La/e/a/a/f;

    invoke-virtual {p3}, La/e/a/a/f;->i()Z

    move-result p3

    if-eqz p3, :cond_6

    iget-object p3, p0, La/e/a/a/h;->x:La/e/a/a/f;

    invoke-virtual {p3}, La/e/a/a/f;->i()Z

    move-result p3

    if-nez p3, :cond_8

    :cond_6
    iget-object p3, p0, La/e/a/a/h;->w:La/e/a/a/f;

    invoke-virtual {p3}, La/e/a/a/f;->i()Z

    move-result p3

    if-eqz p3, :cond_7

    iget-object p3, p0, La/e/a/a/h;->y:La/e/a/a/f;

    invoke-virtual {p3}, La/e/a/a/f;->i()Z

    move-result p3

    if-eqz p3, :cond_7

    iput v2, p0, La/e/a/a/h;->q:I

    goto :goto_2

    :cond_7
    iget-object p3, p0, La/e/a/a/h;->v:La/e/a/a/f;

    invoke-virtual {p3}, La/e/a/a/f;->i()Z

    move-result p3

    if-eqz p3, :cond_8

    iget-object p3, p0, La/e/a/a/h;->x:La/e/a/a/f;

    invoke-virtual {p3}, La/e/a/a/f;->i()Z

    move-result p3

    if-eqz p3, :cond_8

    iget p3, p0, La/e/a/a/h;->r:F

    div-float p3, v1, p3

    iput p3, p0, La/e/a/a/h;->r:F

    iput v4, p0, La/e/a/a/h;->q:I

    :cond_8
    :goto_2
    iget p3, p0, La/e/a/a/h;->q:I

    if-ne p3, v3, :cond_a

    if-eqz p1, :cond_9

    if-nez p2, :cond_9

    iput v2, p0, La/e/a/a/h;->q:I

    goto :goto_3

    :cond_9
    if-nez p1, :cond_a

    if-eqz p2, :cond_a

    iget p3, p0, La/e/a/a/h;->r:F

    div-float p3, v1, p3

    iput p3, p0, La/e/a/a/h;->r:F

    iput v4, p0, La/e/a/a/h;->q:I

    :cond_a
    :goto_3
    iget p3, p0, La/e/a/a/h;->q:I

    if-ne p3, v3, :cond_c

    iget p3, p0, La/e/a/a/h;->i:I

    if-lez p3, :cond_b

    iget p3, p0, La/e/a/a/h;->l:I

    if-nez p3, :cond_b

    iput v2, p0, La/e/a/a/h;->q:I

    goto :goto_4

    :cond_b
    iget p3, p0, La/e/a/a/h;->i:I

    if-nez p3, :cond_c

    iget p3, p0, La/e/a/a/h;->l:I

    if-lez p3, :cond_c

    iget p3, p0, La/e/a/a/h;->r:F

    div-float p3, v1, p3

    iput p3, p0, La/e/a/a/h;->r:F

    iput v4, p0, La/e/a/a/h;->q:I

    :cond_c
    :goto_4
    iget p3, p0, La/e/a/a/h;->q:I

    if-ne p3, v3, :cond_d

    if-eqz p1, :cond_d

    if-eqz p2, :cond_d

    iget p1, p0, La/e/a/a/h;->r:F

    div-float/2addr v1, p1

    iput v1, p0, La/e/a/a/h;->r:F

    iput v4, p0, La/e/a/a/h;->q:I

    :cond_d
    return-void
.end method

.method public a()Z
    .locals 2

    iget v0, p0, La/e/a/a/h;->ea:I

    const/16 v1, 0x8

    if-eq v0, v1, :cond_0

    const/4 v0, 0x1

    goto :goto_0

    :cond_0
    const/4 v0, 0x0

    :goto_0
    return v0
.end method

.method public b(I)F
    .locals 1

    if-nez p1, :cond_0

    iget p1, p0, La/e/a/a/h;->aa:F

    return p1

    :cond_0
    const/4 v0, 0x1

    if-ne p1, v0, :cond_1

    iget p1, p0, La/e/a/a/h;->ba:F

    return p1

    :cond_1
    const/high16 p1, -0x40800000    # -1.0f

    return p1
.end method

.method public b()Ljava/util/ArrayList;
    .locals 1
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "()",
            "Ljava/util/ArrayList<",
            "La/e/a/a/f;",
            ">;"
        }
    .end annotation

    iget-object v0, p0, La/e/a/a/h;->E:Ljava/util/ArrayList;

    return-object v0
.end method

.method public b(F)V
    .locals 2

    iget-object v0, p0, La/e/a/a/h;->qa:[F

    const/4 v1, 0x0

    aput p1, v0, v1

    return-void
.end method

.method public b(II)V
    .locals 0

    iput p1, p0, La/e/a/a/h;->T:I

    iput p2, p0, La/e/a/a/h;->U:I

    return-void
.end method

.method public b(IIIF)V
    .locals 0

    iput p1, p0, La/e/a/a/h;->g:I

    iput p2, p0, La/e/a/a/h;->l:I

    iput p3, p0, La/e/a/a/h;->m:I

    iput p4, p0, La/e/a/a/h;->n:F

    const/high16 p1, 0x3f800000    # 1.0f

    cmpg-float p1, p4, p1

    if-gez p1, :cond_0

    iget p1, p0, La/e/a/a/h;->g:I

    if-nez p1, :cond_0

    const/4 p1, 0x2

    iput p1, p0, La/e/a/a/h;->g:I

    :cond_0
    return-void
.end method

.method public b(La/e/a/a/h$a;)V
    .locals 2

    iget-object v0, p0, La/e/a/a/h;->F:[La/e/a/a/h$a;

    const/4 v1, 0x1

    aput-object p1, v0, v1

    sget-object v0, La/e/a/a/h$a;->b:La/e/a/a/h$a;

    if-ne p1, v0, :cond_0

    iget p1, p0, La/e/a/a/h;->Z:I

    invoke-virtual {p0, p1}, La/e/a/a/h;->g(I)V

    :cond_0
    return-void
.end method

.method public b(La/e/a/e;)V
    .locals 1

    iget-object v0, p0, La/e/a/a/h;->v:La/e/a/a/f;

    invoke-virtual {p1, v0}, La/e/a/e;->a(Ljava/lang/Object;)La/e/a/i;

    iget-object v0, p0, La/e/a/a/h;->w:La/e/a/a/f;

    invoke-virtual {p1, v0}, La/e/a/e;->a(Ljava/lang/Object;)La/e/a/i;

    iget-object v0, p0, La/e/a/a/h;->x:La/e/a/a/f;

    invoke-virtual {p1, v0}, La/e/a/e;->a(Ljava/lang/Object;)La/e/a/i;

    iget-object v0, p0, La/e/a/a/h;->y:La/e/a/a/f;

    invoke-virtual {p1, v0}, La/e/a/e;->a(Ljava/lang/Object;)La/e/a/i;

    iget v0, p0, La/e/a/a/h;->V:I

    if-lez v0, :cond_0

    iget-object v0, p0, La/e/a/a/h;->z:La/e/a/a/f;

    invoke-virtual {p1, v0}, La/e/a/e;->a(Ljava/lang/Object;)La/e/a/i;

    :cond_0
    return-void
.end method

.method public b(Ljava/lang/String;)V
    .locals 8

    const/4 v0, 0x0

    if-eqz p1, :cond_8

    invoke-virtual {p1}, Ljava/lang/String;->length()I

    move-result v1

    if-nez v1, :cond_0

    goto/16 :goto_2

    :cond_0
    const/4 v1, -0x1

    invoke-virtual {p1}, Ljava/lang/String;->length()I

    move-result v2

    const/16 v3, 0x2c

    invoke-virtual {p1, v3}, Ljava/lang/String;->indexOf(I)I

    move-result v3

    const/4 v4, 0x0

    const/4 v5, 0x1

    if-lez v3, :cond_3

    add-int/lit8 v6, v2, -0x1

    if-ge v3, v6, :cond_3

    invoke-virtual {p1, v4, v3}, Ljava/lang/String;->substring(II)Ljava/lang/String;

    move-result-object v6

    const-string v7, "W"

    invoke-virtual {v6, v7}, Ljava/lang/String;->equalsIgnoreCase(Ljava/lang/String;)Z

    move-result v7

    if-eqz v7, :cond_1

    move v1, v4

    goto :goto_0

    :cond_1
    const-string v4, "H"

    invoke-virtual {v6, v4}, Ljava/lang/String;->equalsIgnoreCase(Ljava/lang/String;)Z

    move-result v4

    if-eqz v4, :cond_2

    move v1, v5

    :cond_2
    :goto_0
    add-int/lit8 v4, v3, 0x1

    :cond_3
    const/16 v3, 0x3a

    invoke-virtual {p1, v3}, Ljava/lang/String;->indexOf(I)I

    move-result v3

    if-ltz v3, :cond_5

    sub-int/2addr v2, v5

    if-ge v3, v2, :cond_5

    invoke-virtual {p1, v4, v3}, Ljava/lang/String;->substring(II)Ljava/lang/String;

    move-result-object v2

    add-int/2addr v3, v5

    invoke-virtual {p1, v3}, Ljava/lang/String;->substring(I)Ljava/lang/String;

    move-result-object p1

    invoke-virtual {v2}, Ljava/lang/String;->length()I

    move-result v3

    if-lez v3, :cond_6

    invoke-virtual {p1}, Ljava/lang/String;->length()I

    move-result v3

    if-lez v3, :cond_6

    :try_start_0
    invoke-static {v2}, Ljava/lang/Float;->parseFloat(Ljava/lang/String;)F

    move-result v2

    invoke-static {p1}, Ljava/lang/Float;->parseFloat(Ljava/lang/String;)F

    move-result p1

    cmpl-float v3, v2, v0

    if-lez v3, :cond_6

    cmpl-float v3, p1, v0

    if-lez v3, :cond_6

    if-ne v1, v5, :cond_4

    div-float/2addr p1, v2

    invoke-static {p1}, Ljava/lang/Math;->abs(F)F

    move-result p1

    goto :goto_1

    :cond_4
    div-float/2addr v2, p1

    invoke-static {v2}, Ljava/lang/Math;->abs(F)F

    move-result p1
    :try_end_0
    .catch Ljava/lang/NumberFormatException; {:try_start_0 .. :try_end_0} :catch_0

    goto :goto_1

    :cond_5
    invoke-virtual {p1, v4}, Ljava/lang/String;->substring(I)Ljava/lang/String;

    move-result-object p1

    invoke-virtual {p1}, Ljava/lang/String;->length()I

    move-result v2

    if-lez v2, :cond_6

    :try_start_1
    invoke-static {p1}, Ljava/lang/Float;->parseFloat(Ljava/lang/String;)F

    move-result p1
    :try_end_1
    .catch Ljava/lang/NumberFormatException; {:try_start_1 .. :try_end_1} :catch_0

    goto :goto_1

    :catch_0
    :cond_6
    move p1, v0

    :goto_1
    cmpl-float v0, p1, v0

    if-lez v0, :cond_7

    iput p1, p0, La/e/a/a/h;->J:F

    iput v1, p0, La/e/a/a/h;->K:I

    :cond_7
    return-void

    :cond_8
    :goto_2
    iput v0, p0, La/e/a/a/h;->J:F

    return-void
.end method

.method public b(Z)V
    .locals 0

    iput-boolean p1, p0, La/e/a/a/h;->o:Z

    return-void
.end method

.method public c()I
    .locals 1

    iget v0, p0, La/e/a/a/h;->V:I

    return v0
.end method

.method public c(I)La/e/a/a/h$a;
    .locals 1

    if-nez p1, :cond_0

    invoke-virtual {p0}, La/e/a/a/h;->j()La/e/a/a/h$a;

    move-result-object p1

    return-object p1

    :cond_0
    const/4 v0, 0x1

    if-ne p1, v0, :cond_1

    invoke-virtual {p0}, La/e/a/a/h;->q()La/e/a/a/h$a;

    move-result-object p1

    return-object p1

    :cond_1
    const/4 p1, 0x0

    return-object p1
.end method

.method public c(F)V
    .locals 0

    iput p1, p0, La/e/a/a/h;->ba:F

    return-void
.end method

.method public c(II)V
    .locals 0

    iput p1, p0, La/e/a/a/h;->L:I

    iput p2, p0, La/e/a/a/h;->M:I

    return-void
.end method

.method public c(La/e/a/e;)V
    .locals 6

    iget-object v0, p0, La/e/a/a/h;->v:La/e/a/a/f;

    invoke-virtual {p1, v0}, La/e/a/e;->b(Ljava/lang/Object;)I

    move-result v0

    iget-object v1, p0, La/e/a/a/h;->w:La/e/a/a/f;

    invoke-virtual {p1, v1}, La/e/a/e;->b(Ljava/lang/Object;)I

    move-result v1

    iget-object v2, p0, La/e/a/a/h;->x:La/e/a/a/f;

    invoke-virtual {p1, v2}, La/e/a/e;->b(Ljava/lang/Object;)I

    move-result v2

    iget-object v3, p0, La/e/a/a/h;->y:La/e/a/a/f;

    invoke-virtual {p1, v3}, La/e/a/e;->b(Ljava/lang/Object;)I

    move-result p1

    sub-int v3, v2, v0

    sub-int v4, p1, v1

    const/4 v5, 0x0

    if-ltz v3, :cond_0

    if-ltz v4, :cond_0

    const/high16 v3, -0x80000000

    if-eq v0, v3, :cond_0

    const v4, 0x7fffffff

    if-eq v0, v4, :cond_0

    if-eq v1, v3, :cond_0

    if-eq v1, v4, :cond_0

    if-eq v2, v3, :cond_0

    if-eq v2, v4, :cond_0

    if-eq p1, v3, :cond_0

    if-ne p1, v4, :cond_1

    :cond_0
    move p1, v5

    move v0, p1

    move v1, v0

    move v2, v1

    :cond_1
    invoke-virtual {p0, v0, v1, v2, p1}, La/e/a/a/h;->a(IIII)V

    return-void
.end method

.method public d()I
    .locals 2

    invoke-virtual {p0}, La/e/a/a/h;->w()I

    move-result v0

    iget v1, p0, La/e/a/a/h;->I:I

    add-int/2addr v0, v1

    return v0
.end method

.method public d(I)I
    .locals 1

    if-nez p1, :cond_0

    invoke-virtual {p0}, La/e/a/a/h;->s()I

    move-result p1

    return p1

    :cond_0
    const/4 v0, 0x1

    if-ne p1, v0, :cond_1

    invoke-virtual {p0}, La/e/a/a/h;->i()I

    move-result p1

    return p1

    :cond_1
    const/4 p1, 0x0

    return p1
.end method

.method public d(F)V
    .locals 2

    iget-object v0, p0, La/e/a/a/h;->qa:[F

    const/4 v1, 0x1

    aput p1, v0, v1

    return-void
.end method

.method d(II)V
    .locals 1

    if-nez p2, :cond_0

    iput p1, p0, La/e/a/a/h;->N:I

    goto :goto_0

    :cond_0
    const/4 v0, 0x1

    if-ne p2, v0, :cond_1

    iput p1, p0, La/e/a/a/h;->O:I

    :cond_1
    :goto_0
    return-void
.end method

.method e(I)I
    .locals 1

    if-nez p1, :cond_0

    iget p1, p0, La/e/a/a/h;->N:I

    return p1

    :cond_0
    const/4 v0, 0x1

    if-ne p1, v0, :cond_1

    iget p1, p0, La/e/a/a/h;->O:I

    return p1

    :cond_1
    const/4 p1, 0x0

    return p1
.end method

.method public e()Ljava/lang/Object;
    .locals 1

    iget-object v0, p0, La/e/a/a/h;->ca:Ljava/lang/Object;

    return-object v0
.end method

.method public e(II)V
    .locals 0

    iput p1, p0, La/e/a/a/h;->M:I

    sub-int/2addr p2, p1

    iput p2, p0, La/e/a/a/h;->I:I

    iget p1, p0, La/e/a/a/h;->I:I

    iget p2, p0, La/e/a/a/h;->X:I

    if-ge p1, p2, :cond_0

    iput p2, p0, La/e/a/a/h;->I:I

    :cond_0
    return-void
.end method

.method public f()Ljava/lang/String;
    .locals 1

    iget-object v0, p0, La/e/a/a/h;->fa:Ljava/lang/String;

    return-object v0
.end method

.method public f(I)V
    .locals 0

    iput p1, p0, La/e/a/a/h;->V:I

    return-void
.end method

.method public g()I
    .locals 2

    iget v0, p0, La/e/a/a/h;->P:I

    iget v1, p0, La/e/a/a/h;->T:I

    add-int/2addr v0, v1

    return v0
.end method

.method public g(I)V
    .locals 1

    iput p1, p0, La/e/a/a/h;->I:I

    iget p1, p0, La/e/a/a/h;->I:I

    iget v0, p0, La/e/a/a/h;->X:I

    if-ge p1, v0, :cond_0

    iput v0, p0, La/e/a/a/h;->I:I

    :cond_0
    return-void
.end method

.method public h()I
    .locals 2

    iget v0, p0, La/e/a/a/h;->Q:I

    iget v1, p0, La/e/a/a/h;->U:I

    add-int/2addr v0, v1

    return v0
.end method

.method public h(I)V
    .locals 0

    iput p1, p0, La/e/a/a/h;->ma:I

    return-void
.end method

.method public i()I
    .locals 2

    iget v0, p0, La/e/a/a/h;->ea:I

    const/16 v1, 0x8

    if-ne v0, v1, :cond_0

    const/4 v0, 0x0

    return v0

    :cond_0
    iget v0, p0, La/e/a/a/h;->I:I

    return v0
.end method

.method public i(I)V
    .locals 2

    iget-object v0, p0, La/e/a/a/h;->t:[I

    const/4 v1, 0x1

    aput p1, v0, v1

    return-void
.end method

.method public j()La/e/a/a/h$a;
    .locals 2

    iget-object v0, p0, La/e/a/a/h;->F:[La/e/a/a/h$a;

    const/4 v1, 0x0

    aget-object v0, v0, v1

    return-object v0
.end method

.method public j(I)V
    .locals 2

    iget-object v0, p0, La/e/a/a/h;->t:[I

    const/4 v1, 0x0

    aput p1, v0, v1

    return-void
.end method

.method public k()La/e/a/a/h;
    .locals 1

    iget-object v0, p0, La/e/a/a/h;->G:La/e/a/a/h;

    return-object v0
.end method

.method public k(I)V
    .locals 0

    if-gez p1, :cond_0

    const/4 p1, 0x0

    :cond_0
    iput p1, p0, La/e/a/a/h;->X:I

    return-void
.end method

.method public l()La/e/a/a/q;
    .locals 1

    iget-object v0, p0, La/e/a/a/h;->e:La/e/a/a/q;

    if-nez v0, :cond_0

    new-instance v0, La/e/a/a/q;

    invoke-direct {v0}, La/e/a/a/q;-><init>()V

    iput-object v0, p0, La/e/a/a/h;->e:La/e/a/a/q;

    :cond_0
    iget-object v0, p0, La/e/a/a/h;->e:La/e/a/a/q;

    return-object v0
.end method

.method public l(I)V
    .locals 0

    if-gez p1, :cond_0

    const/4 p1, 0x0

    :cond_0
    iput p1, p0, La/e/a/a/h;->W:I

    return-void
.end method

.method public m()La/e/a/a/q;
    .locals 1

    iget-object v0, p0, La/e/a/a/h;->d:La/e/a/a/q;

    if-nez v0, :cond_0

    new-instance v0, La/e/a/a/q;

    invoke-direct {v0}, La/e/a/a/q;-><init>()V

    iput-object v0, p0, La/e/a/a/h;->d:La/e/a/a/q;

    :cond_0
    iget-object v0, p0, La/e/a/a/h;->d:La/e/a/a/q;

    return-object v0
.end method

.method public m(I)V
    .locals 0

    iput p1, p0, La/e/a/a/h;->na:I

    return-void
.end method

.method public n()I
    .locals 2

    invoke-virtual {p0}, La/e/a/a/h;->v()I

    move-result v0

    iget v1, p0, La/e/a/a/h;->H:I

    add-int/2addr v0, v1

    return v0
.end method

.method public n(I)V
    .locals 0

    iput p1, p0, La/e/a/a/h;->ea:I

    return-void
.end method

.method protected o()I
    .locals 2

    iget v0, p0, La/e/a/a/h;->L:I

    iget v1, p0, La/e/a/a/h;->T:I

    add-int/2addr v0, v1

    return v0
.end method

.method public o(I)V
    .locals 1

    iput p1, p0, La/e/a/a/h;->H:I

    iget p1, p0, La/e/a/a/h;->H:I

    iget v0, p0, La/e/a/a/h;->W:I

    if-ge p1, v0, :cond_0

    iput v0, p0, La/e/a/a/h;->H:I

    :cond_0
    return-void
.end method

.method protected p()I
    .locals 2

    iget v0, p0, La/e/a/a/h;->M:I

    iget v1, p0, La/e/a/a/h;->U:I

    add-int/2addr v0, v1

    return v0
.end method

.method public p(I)V
    .locals 0

    iput p1, p0, La/e/a/a/h;->Z:I

    return-void
.end method

.method public q()La/e/a/a/h$a;
    .locals 2

    iget-object v0, p0, La/e/a/a/h;->F:[La/e/a/a/h$a;

    const/4 v1, 0x1

    aget-object v0, v0, v1

    return-object v0
.end method

.method public q(I)V
    .locals 0

    iput p1, p0, La/e/a/a/h;->Y:I

    return-void
.end method

.method public r()I
    .locals 1

    iget v0, p0, La/e/a/a/h;->ea:I

    return v0
.end method

.method public r(I)V
    .locals 0

    iput p1, p0, La/e/a/a/h;->L:I

    return-void
.end method

.method public s()I
    .locals 2

    iget v0, p0, La/e/a/a/h;->ea:I

    const/16 v1, 0x8

    if-ne v0, v1, :cond_0

    const/4 v0, 0x0

    return v0

    :cond_0
    iget v0, p0, La/e/a/a/h;->H:I

    return v0
.end method

.method public s(I)V
    .locals 0

    iput p1, p0, La/e/a/a/h;->M:I

    return-void
.end method

.method public t()I
    .locals 1

    iget v0, p0, La/e/a/a/h;->Z:I

    return v0
.end method

.method public toString()Ljava/lang/String;
    .locals 5

    new-instance v0, Ljava/lang/StringBuilder;

    invoke-direct {v0}, Ljava/lang/StringBuilder;-><init>()V

    iget-object v1, p0, La/e/a/a/h;->ga:Ljava/lang/String;

    const-string v2, " "

    const-string v3, ""

    if-eqz v1, :cond_0

    new-instance v1, Ljava/lang/StringBuilder;

    invoke-direct {v1}, Ljava/lang/StringBuilder;-><init>()V

    const-string v4, "type: "

    invoke-virtual {v1, v4}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    iget-object v4, p0, La/e/a/a/h;->ga:Ljava/lang/String;

    invoke-virtual {v1, v4}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v1}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v1

    goto :goto_0

    :cond_0
    move-object v1, v3

    :goto_0
    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    iget-object v1, p0, La/e/a/a/h;->fa:Ljava/lang/String;

    if-eqz v1, :cond_1

    new-instance v1, Ljava/lang/StringBuilder;

    invoke-direct {v1}, Ljava/lang/StringBuilder;-><init>()V

    const-string v3, "id: "

    invoke-virtual {v1, v3}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    iget-object v3, p0, La/e/a/a/h;->fa:Ljava/lang/String;

    invoke-virtual {v1, v3}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v1}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v3

    :cond_1
    invoke-virtual {v0, v3}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    const-string v1, "("

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    iget v1, p0, La/e/a/a/h;->L:I

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(I)Ljava/lang/StringBuilder;

    const-string v1, ", "

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    iget v1, p0, La/e/a/a/h;->M:I

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(I)Ljava/lang/StringBuilder;

    const-string v1, ") - ("

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    iget v1, p0, La/e/a/a/h;->H:I

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(I)Ljava/lang/StringBuilder;

    const-string v1, " x "

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    iget v2, p0, La/e/a/a/h;->I:I

    invoke-virtual {v0, v2}, Ljava/lang/StringBuilder;->append(I)Ljava/lang/StringBuilder;

    const-string v2, ") wrap: ("

    invoke-virtual {v0, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    iget v2, p0, La/e/a/a/h;->Y:I

    invoke-virtual {v0, v2}, Ljava/lang/StringBuilder;->append(I)Ljava/lang/StringBuilder;

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    iget v1, p0, La/e/a/a/h;->Z:I

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(I)Ljava/lang/StringBuilder;

    const-string v1, ")"

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v0}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    return-object v0
.end method

.method public u()I
    .locals 1

    iget v0, p0, La/e/a/a/h;->Y:I

    return v0
.end method

.method public v()I
    .locals 1

    iget v0, p0, La/e/a/a/h;->L:I

    return v0
.end method

.method public w()I
    .locals 1

    iget v0, p0, La/e/a/a/h;->M:I

    return v0
.end method

.method public x()Z
    .locals 1

    iget v0, p0, La/e/a/a/h;->V:I

    if-lez v0, :cond_0

    const/4 v0, 0x1

    goto :goto_0

    :cond_0
    const/4 v0, 0x0

    :goto_0
    return v0
.end method

.method public y()Z
    .locals 2

    iget-object v0, p0, La/e/a/a/h;->v:La/e/a/a/f;

    invoke-virtual {v0}, La/e/a/a/f;->d()La/e/a/a/p;

    move-result-object v0

    iget v0, v0, La/e/a/a/r;->b:I

    const/4 v1, 0x1

    if-ne v0, v1, :cond_0

    iget-object v0, p0, La/e/a/a/h;->x:La/e/a/a/f;

    invoke-virtual {v0}, La/e/a/a/f;->d()La/e/a/a/p;

    move-result-object v0

    iget v0, v0, La/e/a/a/r;->b:I

    if-ne v0, v1, :cond_0

    iget-object v0, p0, La/e/a/a/h;->w:La/e/a/a/f;

    invoke-virtual {v0}, La/e/a/a/f;->d()La/e/a/a/p;

    move-result-object v0

    iget v0, v0, La/e/a/a/r;->b:I

    if-ne v0, v1, :cond_0

    iget-object v0, p0, La/e/a/a/h;->y:La/e/a/a/f;

    invoke-virtual {v0}, La/e/a/a/f;->d()La/e/a/a/p;

    move-result-object v0

    iget v0, v0, La/e/a/a/r;->b:I

    if-ne v0, v1, :cond_0

    return v1

    :cond_0
    const/4 v0, 0x0

    return v0
.end method

.method public z()Z
    .locals 2

    iget-object v0, p0, La/e/a/a/h;->v:La/e/a/a/f;

    iget-object v1, v0, La/e/a/a/f;->d:La/e/a/a/f;

    if-eqz v1, :cond_0

    iget-object v1, v1, La/e/a/a/f;->d:La/e/a/a/f;

    if-eq v1, v0, :cond_1

    :cond_0
    iget-object v0, p0, La/e/a/a/h;->x:La/e/a/a/f;

    iget-object v1, v0, La/e/a/a/f;->d:La/e/a/a/f;

    if-eqz v1, :cond_2

    iget-object v1, v1, La/e/a/a/f;->d:La/e/a/a/f;

    if-ne v1, v0, :cond_2

    :cond_1
    const/4 v0, 0x1

    return v0

    :cond_2
    const/4 v0, 0x0

    return v0
.end method
