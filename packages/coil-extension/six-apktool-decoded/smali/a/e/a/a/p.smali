.class public La/e/a/a/p;
.super La/e/a/a/r;
.source ""


# instance fields
.field c:La/e/a/a/f;

.field d:F

.field e:La/e/a/a/p;

.field f:F

.field g:La/e/a/a/p;

.field h:F

.field i:I

.field private j:La/e/a/a/p;

.field private k:F

.field private l:La/e/a/a/q;

.field private m:I

.field private n:La/e/a/a/q;

.field private o:I


# direct methods
.method public constructor <init>(La/e/a/a/f;)V
    .locals 2

    invoke-direct {p0}, La/e/a/a/r;-><init>()V

    const/4 v0, 0x0

    iput v0, p0, La/e/a/a/p;->i:I

    const/4 v0, 0x0

    iput-object v0, p0, La/e/a/a/p;->l:La/e/a/a/q;

    const/4 v1, 0x1

    iput v1, p0, La/e/a/a/p;->m:I

    iput-object v0, p0, La/e/a/a/p;->n:La/e/a/a/q;

    iput v1, p0, La/e/a/a/p;->o:I

    iput-object p1, p0, La/e/a/a/p;->c:La/e/a/a/f;

    return-void
.end method


# virtual methods
.method a(I)Ljava/lang/String;
    .locals 1

    const/4 v0, 0x1

    if-ne p1, v0, :cond_0

    const-string p1, "DIRECT"

    return-object p1

    :cond_0
    const/4 v0, 0x2

    if-ne p1, v0, :cond_1

    const-string p1, "CENTER"

    return-object p1

    :cond_1
    const/4 v0, 0x3

    if-ne p1, v0, :cond_2

    const-string p1, "MATCH"

    return-object p1

    :cond_2
    const/4 v0, 0x4

    if-ne p1, v0, :cond_3

    const-string p1, "CHAIN"

    return-object p1

    :cond_3
    const/4 v0, 0x5

    if-ne p1, v0, :cond_4

    const-string p1, "BARRIER"

    return-object p1

    :cond_4
    const-string p1, "UNCONNECTED"

    return-object p1
.end method

.method public a(ILa/e/a/a/p;I)V
    .locals 0

    iput p1, p0, La/e/a/a/p;->i:I

    iput-object p2, p0, La/e/a/a/p;->e:La/e/a/a/p;

    int-to-float p1, p3

    iput p1, p0, La/e/a/a/p;->f:F

    iget-object p1, p0, La/e/a/a/p;->e:La/e/a/a/p;

    invoke-virtual {p1, p0}, La/e/a/a/r;->a(La/e/a/a/r;)V

    return-void
.end method

.method public a(La/e/a/a/p;F)V
    .locals 1

    iget v0, p0, La/e/a/a/r;->b:I

    if-eqz v0, :cond_0

    iget-object v0, p0, La/e/a/a/p;->g:La/e/a/a/p;

    if-eq v0, p1, :cond_2

    iget v0, p0, La/e/a/a/p;->h:F

    cmpl-float v0, v0, p2

    if-eqz v0, :cond_2

    :cond_0
    iput-object p1, p0, La/e/a/a/p;->g:La/e/a/a/p;

    iput p2, p0, La/e/a/a/p;->h:F

    iget p1, p0, La/e/a/a/r;->b:I

    const/4 p2, 0x1

    if-ne p1, p2, :cond_1

    invoke-virtual {p0}, La/e/a/a/r;->b()V

    :cond_1
    invoke-virtual {p0}, La/e/a/a/r;->a()V

    :cond_2
    return-void
.end method

.method public a(La/e/a/a/p;I)V
    .locals 0

    iput-object p1, p0, La/e/a/a/p;->e:La/e/a/a/p;

    int-to-float p1, p2

    iput p1, p0, La/e/a/a/p;->f:F

    iget-object p1, p0, La/e/a/a/p;->e:La/e/a/a/p;

    invoke-virtual {p1, p0}, La/e/a/a/r;->a(La/e/a/a/r;)V

    return-void
.end method

.method public a(La/e/a/a/p;ILa/e/a/a/q;)V
    .locals 0

    iput-object p1, p0, La/e/a/a/p;->e:La/e/a/a/p;

    iget-object p1, p0, La/e/a/a/p;->e:La/e/a/a/p;

    invoke-virtual {p1, p0}, La/e/a/a/r;->a(La/e/a/a/r;)V

    iput-object p3, p0, La/e/a/a/p;->l:La/e/a/a/q;

    iput p2, p0, La/e/a/a/p;->m:I

    iget-object p1, p0, La/e/a/a/p;->l:La/e/a/a/q;

    invoke-virtual {p1, p0}, La/e/a/a/r;->a(La/e/a/a/r;)V

    return-void
.end method

.method a(La/e/a/e;)V
    .locals 4

    iget-object v0, p0, La/e/a/a/p;->c:La/e/a/a/f;

    invoke-virtual {v0}, La/e/a/a/f;->e()La/e/a/i;

    move-result-object v0

    iget-object v1, p0, La/e/a/a/p;->g:La/e/a/a/p;

    const/high16 v2, 0x3f000000    # 0.5f

    if-nez v1, :cond_0

    iget v1, p0, La/e/a/a/p;->h:F

    add-float/2addr v1, v2

    float-to-int v1, v1

    invoke-virtual {p1, v0, v1}, La/e/a/e;->a(La/e/a/i;I)V

    goto :goto_0

    :cond_0
    iget-object v1, v1, La/e/a/a/p;->c:La/e/a/a/f;

    invoke-virtual {p1, v1}, La/e/a/e;->a(Ljava/lang/Object;)La/e/a/i;

    move-result-object v1

    iget v3, p0, La/e/a/a/p;->h:F

    add-float/2addr v3, v2

    float-to-int v2, v3

    const/4 v3, 0x6

    invoke-virtual {p1, v0, v1, v2, v3}, La/e/a/e;->a(La/e/a/i;La/e/a/i;II)La/e/a/b;

    :goto_0
    return-void
.end method

.method public b(I)V
    .locals 0

    iput p1, p0, La/e/a/a/p;->i:I

    return-void
.end method

.method public b(La/e/a/a/p;F)V
    .locals 0

    iput-object p1, p0, La/e/a/a/p;->j:La/e/a/a/p;

    iput p2, p0, La/e/a/a/p;->k:F

    return-void
.end method

.method public b(La/e/a/a/p;ILa/e/a/a/q;)V
    .locals 0

    iput-object p1, p0, La/e/a/a/p;->j:La/e/a/a/p;

    iput-object p3, p0, La/e/a/a/p;->n:La/e/a/a/q;

    iput p2, p0, La/e/a/a/p;->o:I

    return-void
.end method

.method public d()V
    .locals 3

    invoke-super {p0}, La/e/a/a/r;->d()V

    const/4 v0, 0x0

    iput-object v0, p0, La/e/a/a/p;->e:La/e/a/a/p;

    const/4 v1, 0x0

    iput v1, p0, La/e/a/a/p;->f:F

    iput-object v0, p0, La/e/a/a/p;->l:La/e/a/a/q;

    const/4 v2, 0x1

    iput v2, p0, La/e/a/a/p;->m:I

    iput-object v0, p0, La/e/a/a/p;->n:La/e/a/a/q;

    iput v2, p0, La/e/a/a/p;->o:I

    iput-object v0, p0, La/e/a/a/p;->g:La/e/a/a/p;

    iput v1, p0, La/e/a/a/p;->h:F

    iput v1, p0, La/e/a/a/p;->d:F

    iput-object v0, p0, La/e/a/a/p;->j:La/e/a/a/p;

    iput v1, p0, La/e/a/a/p;->k:F

    const/4 v0, 0x0

    iput v0, p0, La/e/a/a/p;->i:I

    return-void
.end method

.method public e()V
    .locals 8

    iget v0, p0, La/e/a/a/r;->b:I

    const/4 v1, 0x1

    if-ne v0, v1, :cond_0

    return-void

    :cond_0
    iget v0, p0, La/e/a/a/p;->i:I

    const/4 v2, 0x4

    if-ne v0, v2, :cond_1

    return-void

    :cond_1
    iget-object v0, p0, La/e/a/a/p;->l:La/e/a/a/q;

    if-eqz v0, :cond_3

    iget v2, v0, La/e/a/a/r;->b:I

    if-eq v2, v1, :cond_2

    return-void

    :cond_2
    iget v2, p0, La/e/a/a/p;->m:I

    int-to-float v2, v2

    iget v0, v0, La/e/a/a/q;->c:F

    mul-float/2addr v2, v0

    iput v2, p0, La/e/a/a/p;->f:F

    :cond_3
    iget-object v0, p0, La/e/a/a/p;->n:La/e/a/a/q;

    if-eqz v0, :cond_5

    iget v2, v0, La/e/a/a/r;->b:I

    if-eq v2, v1, :cond_4

    return-void

    :cond_4
    iget v2, p0, La/e/a/a/p;->o:I

    int-to-float v2, v2

    iget v0, v0, La/e/a/a/q;->c:F

    mul-float/2addr v2, v0

    iput v2, p0, La/e/a/a/p;->k:F

    :cond_5
    iget v0, p0, La/e/a/a/p;->i:I

    if-ne v0, v1, :cond_8

    iget-object v0, p0, La/e/a/a/p;->e:La/e/a/a/p;

    if-eqz v0, :cond_6

    iget v0, v0, La/e/a/a/r;->b:I

    if-ne v0, v1, :cond_8

    :cond_6
    iget-object v0, p0, La/e/a/a/p;->e:La/e/a/a/p;

    if-nez v0, :cond_7

    iput-object p0, p0, La/e/a/a/p;->g:La/e/a/a/p;

    iget v0, p0, La/e/a/a/p;->f:F

    goto :goto_0

    :cond_7
    iget-object v1, v0, La/e/a/a/p;->g:La/e/a/a/p;

    iput-object v1, p0, La/e/a/a/p;->g:La/e/a/a/p;

    iget v0, v0, La/e/a/a/p;->h:F

    iget v1, p0, La/e/a/a/p;->f:F

    add-float/2addr v0, v1

    :goto_0
    iput v0, p0, La/e/a/a/p;->h:F

    invoke-virtual {p0}, La/e/a/a/r;->a()V

    goto/16 :goto_7

    :cond_8
    iget v0, p0, La/e/a/a/p;->i:I

    const/4 v2, 0x2

    const-wide/16 v3, 0x1

    if-ne v0, v2, :cond_11

    iget-object v0, p0, La/e/a/a/p;->e:La/e/a/a/p;

    if-eqz v0, :cond_11

    iget v0, v0, La/e/a/a/r;->b:I

    if-ne v0, v1, :cond_11

    iget-object v0, p0, La/e/a/a/p;->j:La/e/a/a/p;

    if-eqz v0, :cond_11

    iget-object v0, v0, La/e/a/a/p;->e:La/e/a/a/p;

    if-eqz v0, :cond_11

    iget v0, v0, La/e/a/a/r;->b:I

    if-ne v0, v1, :cond_11

    invoke-static {}, La/e/a/e;->e()La/e/a/f;

    move-result-object v0

    if-eqz v0, :cond_9

    invoke-static {}, La/e/a/e;->e()La/e/a/f;

    move-result-object v0

    iget-wide v5, v0, La/e/a/f;->v:J

    add-long/2addr v5, v3

    iput-wide v5, v0, La/e/a/f;->v:J

    :cond_9
    iget-object v0, p0, La/e/a/a/p;->e:La/e/a/a/p;

    iget-object v0, v0, La/e/a/a/p;->g:La/e/a/a/p;

    iput-object v0, p0, La/e/a/a/p;->g:La/e/a/a/p;

    iget-object v0, p0, La/e/a/a/p;->j:La/e/a/a/p;

    iget-object v2, v0, La/e/a/a/p;->e:La/e/a/a/p;

    iget-object v2, v2, La/e/a/a/p;->g:La/e/a/a/p;

    iput-object v2, v0, La/e/a/a/p;->g:La/e/a/a/p;

    iget-object v0, p0, La/e/a/a/p;->c:La/e/a/a/f;

    iget-object v0, v0, La/e/a/a/f;->c:La/e/a/a/f$c;

    sget-object v2, La/e/a/a/f$c;->d:La/e/a/a/f$c;

    const/4 v3, 0x0

    if-eq v0, v2, :cond_b

    sget-object v2, La/e/a/a/f$c;->e:La/e/a/a/f$c;

    if-ne v0, v2, :cond_a

    goto :goto_1

    :cond_a
    move v1, v3

    :cond_b
    :goto_1
    if-eqz v1, :cond_c

    iget-object v0, p0, La/e/a/a/p;->e:La/e/a/a/p;

    iget v0, v0, La/e/a/a/p;->h:F

    iget-object v2, p0, La/e/a/a/p;->j:La/e/a/a/p;

    iget-object v2, v2, La/e/a/a/p;->e:La/e/a/a/p;

    goto :goto_2

    :cond_c
    iget-object v0, p0, La/e/a/a/p;->j:La/e/a/a/p;

    iget-object v0, v0, La/e/a/a/p;->e:La/e/a/a/p;

    iget v0, v0, La/e/a/a/p;->h:F

    iget-object v2, p0, La/e/a/a/p;->e:La/e/a/a/p;

    :goto_2
    iget v2, v2, La/e/a/a/p;->h:F

    sub-float/2addr v0, v2

    iget-object v2, p0, La/e/a/a/p;->c:La/e/a/a/f;

    iget-object v4, v2, La/e/a/a/f;->c:La/e/a/a/f$c;

    sget-object v5, La/e/a/a/f$c;->b:La/e/a/a/f$c;

    if-eq v4, v5, :cond_e

    sget-object v5, La/e/a/a/f$c;->d:La/e/a/a/f$c;

    if-ne v4, v5, :cond_d

    goto :goto_3

    :cond_d
    iget-object v2, v2, La/e/a/a/f;->b:La/e/a/a/h;

    invoke-virtual {v2}, La/e/a/a/h;->i()I

    move-result v2

    int-to-float v2, v2

    sub-float/2addr v0, v2

    iget-object v2, p0, La/e/a/a/p;->c:La/e/a/a/f;

    iget-object v2, v2, La/e/a/a/f;->b:La/e/a/a/h;

    iget v2, v2, La/e/a/a/h;->ba:F

    goto :goto_4

    :cond_e
    :goto_3
    iget-object v2, p0, La/e/a/a/p;->c:La/e/a/a/f;

    iget-object v2, v2, La/e/a/a/f;->b:La/e/a/a/h;

    invoke-virtual {v2}, La/e/a/a/h;->s()I

    move-result v2

    int-to-float v2, v2

    sub-float/2addr v0, v2

    iget-object v2, p0, La/e/a/a/p;->c:La/e/a/a/f;

    iget-object v2, v2, La/e/a/a/f;->b:La/e/a/a/h;

    iget v2, v2, La/e/a/a/h;->aa:F

    :goto_4
    iget-object v4, p0, La/e/a/a/p;->c:La/e/a/a/f;

    invoke-virtual {v4}, La/e/a/a/f;->b()I

    move-result v4

    iget-object v5, p0, La/e/a/a/p;->j:La/e/a/a/p;

    iget-object v5, v5, La/e/a/a/p;->c:La/e/a/a/f;

    invoke-virtual {v5}, La/e/a/a/f;->b()I

    move-result v5

    iget-object v6, p0, La/e/a/a/p;->c:La/e/a/a/f;

    invoke-virtual {v6}, La/e/a/a/f;->g()La/e/a/a/f;

    move-result-object v6

    iget-object v7, p0, La/e/a/a/p;->j:La/e/a/a/p;

    iget-object v7, v7, La/e/a/a/p;->c:La/e/a/a/f;

    invoke-virtual {v7}, La/e/a/a/f;->g()La/e/a/a/f;

    move-result-object v7

    if-ne v6, v7, :cond_f

    const/high16 v2, 0x3f000000    # 0.5f

    move v5, v3

    goto :goto_5

    :cond_f
    move v3, v4

    :goto_5
    int-to-float v3, v3

    sub-float/2addr v0, v3

    int-to-float v4, v5

    sub-float/2addr v0, v4

    const/high16 v5, 0x3f800000    # 1.0f

    if-eqz v1, :cond_10

    iget-object v1, p0, La/e/a/a/p;->j:La/e/a/a/p;

    iget-object v6, v1, La/e/a/a/p;->e:La/e/a/a/p;

    iget v6, v6, La/e/a/a/p;->h:F

    add-float/2addr v6, v4

    mul-float v4, v0, v2

    add-float/2addr v6, v4

    iput v6, v1, La/e/a/a/p;->h:F

    iget-object v1, p0, La/e/a/a/p;->e:La/e/a/a/p;

    iget v1, v1, La/e/a/a/p;->h:F

    sub-float/2addr v1, v3

    sub-float/2addr v5, v2

    mul-float/2addr v0, v5

    sub-float/2addr v1, v0

    iput v1, p0, La/e/a/a/p;->h:F

    goto :goto_6

    :cond_10
    iget-object v1, p0, La/e/a/a/p;->e:La/e/a/a/p;

    iget v1, v1, La/e/a/a/p;->h:F

    add-float/2addr v1, v3

    mul-float v3, v0, v2

    add-float/2addr v1, v3

    iput v1, p0, La/e/a/a/p;->h:F

    iget-object v1, p0, La/e/a/a/p;->j:La/e/a/a/p;

    iget-object v3, v1, La/e/a/a/p;->e:La/e/a/a/p;

    iget v3, v3, La/e/a/a/p;->h:F

    sub-float/2addr v3, v4

    sub-float/2addr v5, v2

    mul-float/2addr v0, v5

    sub-float/2addr v3, v0

    iput v3, v1, La/e/a/a/p;->h:F

    goto :goto_6

    :cond_11
    iget v0, p0, La/e/a/a/p;->i:I

    const/4 v2, 0x3

    if-ne v0, v2, :cond_13

    iget-object v0, p0, La/e/a/a/p;->e:La/e/a/a/p;

    if-eqz v0, :cond_13

    iget v0, v0, La/e/a/a/r;->b:I

    if-ne v0, v1, :cond_13

    iget-object v0, p0, La/e/a/a/p;->j:La/e/a/a/p;

    if-eqz v0, :cond_13

    iget-object v0, v0, La/e/a/a/p;->e:La/e/a/a/p;

    if-eqz v0, :cond_13

    iget v0, v0, La/e/a/a/r;->b:I

    if-ne v0, v1, :cond_13

    invoke-static {}, La/e/a/e;->e()La/e/a/f;

    move-result-object v0

    if-eqz v0, :cond_12

    invoke-static {}, La/e/a/e;->e()La/e/a/f;

    move-result-object v0

    iget-wide v1, v0, La/e/a/f;->w:J

    add-long/2addr v1, v3

    iput-wide v1, v0, La/e/a/f;->w:J

    :cond_12
    iget-object v0, p0, La/e/a/a/p;->e:La/e/a/a/p;

    iget-object v1, v0, La/e/a/a/p;->g:La/e/a/a/p;

    iput-object v1, p0, La/e/a/a/p;->g:La/e/a/a/p;

    iget-object v1, p0, La/e/a/a/p;->j:La/e/a/a/p;

    iget-object v2, v1, La/e/a/a/p;->e:La/e/a/a/p;

    iget-object v3, v2, La/e/a/a/p;->g:La/e/a/a/p;

    iput-object v3, v1, La/e/a/a/p;->g:La/e/a/a/p;

    iget v0, v0, La/e/a/a/p;->h:F

    iget v3, p0, La/e/a/a/p;->f:F

    add-float/2addr v0, v3

    iput v0, p0, La/e/a/a/p;->h:F

    iget v0, v2, La/e/a/a/p;->h:F

    iget v2, v1, La/e/a/a/p;->f:F

    add-float/2addr v0, v2

    iput v0, v1, La/e/a/a/p;->h:F

    :goto_6
    invoke-virtual {p0}, La/e/a/a/r;->a()V

    iget-object v0, p0, La/e/a/a/p;->j:La/e/a/a/p;

    invoke-virtual {v0}, La/e/a/a/r;->a()V

    goto :goto_7

    :cond_13
    iget v0, p0, La/e/a/a/p;->i:I

    const/4 v1, 0x5

    if-ne v0, v1, :cond_14

    iget-object v0, p0, La/e/a/a/p;->c:La/e/a/a/f;

    iget-object v0, v0, La/e/a/a/f;->b:La/e/a/a/h;

    invoke-virtual {v0}, La/e/a/a/h;->G()V

    :cond_14
    :goto_7
    return-void
.end method

.method public f()F
    .locals 1

    iget v0, p0, La/e/a/a/p;->h:F

    return v0
.end method

.method public g()V
    .locals 4

    iget-object v0, p0, La/e/a/a/p;->c:La/e/a/a/f;

    invoke-virtual {v0}, La/e/a/a/f;->g()La/e/a/a/f;

    move-result-object v0

    if-nez v0, :cond_0

    return-void

    :cond_0
    invoke-virtual {v0}, La/e/a/a/f;->g()La/e/a/a/f;

    move-result-object v1

    iget-object v2, p0, La/e/a/a/p;->c:La/e/a/a/f;

    if-ne v1, v2, :cond_1

    const/4 v1, 0x4

    iput v1, p0, La/e/a/a/p;->i:I

    invoke-virtual {v0}, La/e/a/a/f;->d()La/e/a/a/p;

    move-result-object v2

    iput v1, v2, La/e/a/a/p;->i:I

    :cond_1
    iget-object v1, p0, La/e/a/a/p;->c:La/e/a/a/f;

    invoke-virtual {v1}, La/e/a/a/f;->b()I

    move-result v1

    iget-object v2, p0, La/e/a/a/p;->c:La/e/a/a/f;

    iget-object v2, v2, La/e/a/a/f;->c:La/e/a/a/f$c;

    sget-object v3, La/e/a/a/f$c;->d:La/e/a/a/f$c;

    if-eq v2, v3, :cond_2

    sget-object v3, La/e/a/a/f$c;->e:La/e/a/a/f$c;

    if-ne v2, v3, :cond_3

    :cond_2
    neg-int v1, v1

    :cond_3
    invoke-virtual {v0}, La/e/a/a/f;->d()La/e/a/a/p;

    move-result-object v0

    invoke-virtual {p0, v0, v1}, La/e/a/a/p;->a(La/e/a/a/p;I)V

    return-void
.end method

.method public toString()Ljava/lang/String;
    .locals 3

    iget v0, p0, La/e/a/a/r;->b:I

    const/4 v1, 0x1

    if-ne v0, v1, :cond_1

    iget-object v0, p0, La/e/a/a/p;->g:La/e/a/a/p;

    const-string v1, ", RESOLVED: "

    const-string v2, "["

    if-ne v0, p0, :cond_0

    new-instance v0, Ljava/lang/StringBuilder;

    invoke-direct {v0}, Ljava/lang/StringBuilder;-><init>()V

    invoke-virtual {v0, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    iget-object v2, p0, La/e/a/a/p;->c:La/e/a/a/f;

    invoke-virtual {v0, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/Object;)Ljava/lang/StringBuilder;

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    iget v1, p0, La/e/a/a/p;->h:F

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(F)Ljava/lang/StringBuilder;

    const-string v1, "]  type: "

    :goto_0
    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    iget v1, p0, La/e/a/a/p;->i:I

    invoke-virtual {p0, v1}, La/e/a/a/p;->a(I)Ljava/lang/String;

    move-result-object v1

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v0}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    return-object v0

    :cond_0
    new-instance v0, Ljava/lang/StringBuilder;

    invoke-direct {v0}, Ljava/lang/StringBuilder;-><init>()V

    invoke-virtual {v0, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    iget-object v2, p0, La/e/a/a/p;->c:La/e/a/a/f;

    invoke-virtual {v0, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/Object;)Ljava/lang/StringBuilder;

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    iget-object v1, p0, La/e/a/a/p;->g:La/e/a/a/p;

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/Object;)Ljava/lang/StringBuilder;

    const-string v1, ":"

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    iget v1, p0, La/e/a/a/p;->h:F

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(F)Ljava/lang/StringBuilder;

    const-string v1, "] type: "

    goto :goto_0

    :cond_1
    new-instance v0, Ljava/lang/StringBuilder;

    invoke-direct {v0}, Ljava/lang/StringBuilder;-><init>()V

    const-string v1, "{ "

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    iget-object v1, p0, La/e/a/a/p;->c:La/e/a/a/f;

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/Object;)Ljava/lang/StringBuilder;

    const-string v1, " UNRESOLVED} type: "

    goto :goto_0
.end method
