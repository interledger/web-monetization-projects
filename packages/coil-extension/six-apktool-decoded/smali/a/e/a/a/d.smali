.class public La/e/a/a/d;
.super Ljava/lang/Object;
.source ""


# instance fields
.field protected a:La/e/a/a/h;

.field protected b:La/e/a/a/h;

.field protected c:La/e/a/a/h;

.field protected d:La/e/a/a/h;

.field protected e:La/e/a/a/h;

.field protected f:La/e/a/a/h;

.field protected g:La/e/a/a/h;

.field protected h:Ljava/util/ArrayList;
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "Ljava/util/ArrayList<",
            "La/e/a/a/h;",
            ">;"
        }
    .end annotation
.end field

.field protected i:I

.field protected j:I

.field protected k:F

.field private l:I

.field private m:Z

.field protected n:Z

.field protected o:Z

.field protected p:Z

.field private q:Z


# direct methods
.method public constructor <init>(La/e/a/a/h;IZ)V
    .locals 1

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    const/4 v0, 0x0

    iput v0, p0, La/e/a/a/d;->k:F

    const/4 v0, 0x0

    iput-boolean v0, p0, La/e/a/a/d;->m:Z

    iput-object p1, p0, La/e/a/a/d;->a:La/e/a/a/h;

    iput p2, p0, La/e/a/a/d;->l:I

    iput-boolean p3, p0, La/e/a/a/d;->m:Z

    return-void
.end method

.method private static a(La/e/a/a/h;I)Z
    .locals 2

    invoke-virtual {p0}, La/e/a/a/h;->r()I

    move-result v0

    const/16 v1, 0x8

    if-eq v0, v1, :cond_1

    iget-object v0, p0, La/e/a/a/h;->F:[La/e/a/a/h$a;

    aget-object v0, v0, p1

    sget-object v1, La/e/a/a/h$a;->c:La/e/a/a/h$a;

    if-ne v0, v1, :cond_1

    iget-object p0, p0, La/e/a/a/h;->h:[I

    aget v0, p0, p1

    if-eqz v0, :cond_0

    aget p0, p0, p1

    const/4 p1, 0x3

    if-ne p0, p1, :cond_1

    :cond_0
    const/4 p0, 0x1

    goto :goto_0

    :cond_1
    const/4 p0, 0x0

    :goto_0
    return p0
.end method

.method private b()V
    .locals 13

    iget v0, p0, La/e/a/a/d;->l:I

    const/4 v1, 0x2

    mul-int/2addr v0, v1

    iget-object v2, p0, La/e/a/a/d;->a:La/e/a/a/h;

    const/4 v3, 0x0

    move-object v4, v2

    move-object v5, v4

    move v2, v3

    :goto_0
    const/4 v6, 0x1

    if-nez v2, :cond_d

    iget v7, p0, La/e/a/a/d;->i:I

    add-int/2addr v7, v6

    iput v7, p0, La/e/a/a/d;->i:I

    iget-object v7, v4, La/e/a/a/h;->sa:[La/e/a/a/h;

    iget v8, p0, La/e/a/a/d;->l:I

    const/4 v9, 0x0

    aput-object v9, v7, v8

    iget-object v7, v4, La/e/a/a/h;->ra:[La/e/a/a/h;

    aput-object v9, v7, v8

    invoke-virtual {v4}, La/e/a/a/h;->r()I

    move-result v7

    const/16 v8, 0x8

    if-eq v7, v8, :cond_8

    iget-object v7, p0, La/e/a/a/d;->b:La/e/a/a/h;

    if-nez v7, :cond_0

    iput-object v4, p0, La/e/a/a/d;->b:La/e/a/a/h;

    :cond_0
    iput-object v4, p0, La/e/a/a/d;->d:La/e/a/a/h;

    iget-object v7, v4, La/e/a/a/h;->F:[La/e/a/a/h$a;

    iget v8, p0, La/e/a/a/d;->l:I

    aget-object v7, v7, v8

    sget-object v10, La/e/a/a/h$a;->c:La/e/a/a/h$a;

    if-ne v7, v10, :cond_8

    iget-object v7, v4, La/e/a/a/h;->h:[I

    aget v10, v7, v8

    if-eqz v10, :cond_1

    aget v10, v7, v8

    const/4 v11, 0x3

    if-eq v10, v11, :cond_1

    aget v7, v7, v8

    if-ne v7, v1, :cond_8

    :cond_1
    iget v7, p0, La/e/a/a/d;->j:I

    add-int/2addr v7, v6

    iput v7, p0, La/e/a/a/d;->j:I

    iget-object v7, v4, La/e/a/a/h;->qa:[F

    iget v8, p0, La/e/a/a/d;->l:I

    aget v10, v7, v8

    const/4 v11, 0x0

    cmpl-float v12, v10, v11

    if-lez v12, :cond_2

    iget v12, p0, La/e/a/a/d;->k:F

    aget v7, v7, v8

    add-float/2addr v12, v7

    iput v12, p0, La/e/a/a/d;->k:F

    :cond_2
    iget v7, p0, La/e/a/a/d;->l:I

    invoke-static {v4, v7}, La/e/a/a/d;->a(La/e/a/a/h;I)Z

    move-result v7

    if-eqz v7, :cond_5

    cmpg-float v7, v10, v11

    if-gez v7, :cond_3

    iput-boolean v6, p0, La/e/a/a/d;->n:Z

    goto :goto_1

    :cond_3
    iput-boolean v6, p0, La/e/a/a/d;->o:Z

    :goto_1
    iget-object v7, p0, La/e/a/a/d;->h:Ljava/util/ArrayList;

    if-nez v7, :cond_4

    new-instance v7, Ljava/util/ArrayList;

    invoke-direct {v7}, Ljava/util/ArrayList;-><init>()V

    iput-object v7, p0, La/e/a/a/d;->h:Ljava/util/ArrayList;

    :cond_4
    iget-object v7, p0, La/e/a/a/d;->h:Ljava/util/ArrayList;

    invoke-virtual {v7, v4}, Ljava/util/ArrayList;->add(Ljava/lang/Object;)Z

    :cond_5
    iget-object v7, p0, La/e/a/a/d;->f:La/e/a/a/h;

    if-nez v7, :cond_6

    iput-object v4, p0, La/e/a/a/d;->f:La/e/a/a/h;

    :cond_6
    iget-object v7, p0, La/e/a/a/d;->g:La/e/a/a/h;

    if-eqz v7, :cond_7

    iget-object v7, v7, La/e/a/a/h;->ra:[La/e/a/a/h;

    iget v8, p0, La/e/a/a/d;->l:I

    aput-object v4, v7, v8

    :cond_7
    iput-object v4, p0, La/e/a/a/d;->g:La/e/a/a/h;

    :cond_8
    if-eq v5, v4, :cond_9

    iget-object v5, v5, La/e/a/a/h;->sa:[La/e/a/a/h;

    iget v7, p0, La/e/a/a/d;->l:I

    aput-object v4, v5, v7

    :cond_9
    iget-object v5, v4, La/e/a/a/h;->D:[La/e/a/a/f;

    add-int/lit8 v7, v0, 0x1

    aget-object v5, v5, v7

    iget-object v5, v5, La/e/a/a/f;->d:La/e/a/a/f;

    if-eqz v5, :cond_b

    iget-object v5, v5, La/e/a/a/f;->b:La/e/a/a/h;

    iget-object v7, v5, La/e/a/a/h;->D:[La/e/a/a/f;

    aget-object v8, v7, v0

    iget-object v8, v8, La/e/a/a/f;->d:La/e/a/a/f;

    if-eqz v8, :cond_b

    aget-object v7, v7, v0

    iget-object v7, v7, La/e/a/a/f;->d:La/e/a/a/f;

    iget-object v7, v7, La/e/a/a/f;->b:La/e/a/a/h;

    if-eq v7, v4, :cond_a

    goto :goto_2

    :cond_a
    move-object v9, v5

    :cond_b
    :goto_2
    if-eqz v9, :cond_c

    goto :goto_3

    :cond_c
    move-object v9, v4

    move v2, v6

    :goto_3
    move-object v5, v4

    move-object v4, v9

    goto/16 :goto_0

    :cond_d
    iput-object v4, p0, La/e/a/a/d;->c:La/e/a/a/h;

    iget v0, p0, La/e/a/a/d;->l:I

    if-nez v0, :cond_e

    iget-boolean v0, p0, La/e/a/a/d;->m:Z

    if-eqz v0, :cond_e

    iget-object v0, p0, La/e/a/a/d;->c:La/e/a/a/h;

    goto :goto_4

    :cond_e
    iget-object v0, p0, La/e/a/a/d;->a:La/e/a/a/h;

    :goto_4
    iput-object v0, p0, La/e/a/a/d;->e:La/e/a/a/h;

    iget-boolean v0, p0, La/e/a/a/d;->o:Z

    if-eqz v0, :cond_f

    iget-boolean v0, p0, La/e/a/a/d;->n:Z

    if-eqz v0, :cond_f

    move v3, v6

    :cond_f
    iput-boolean v3, p0, La/e/a/a/d;->p:Z

    return-void
.end method


# virtual methods
.method public a()V
    .locals 1

    iget-boolean v0, p0, La/e/a/a/d;->q:Z

    if-nez v0, :cond_0

    invoke-direct {p0}, La/e/a/a/d;->b()V

    :cond_0
    const/4 v0, 0x1

    iput-boolean v0, p0, La/e/a/a/d;->q:Z

    return-void
.end method
