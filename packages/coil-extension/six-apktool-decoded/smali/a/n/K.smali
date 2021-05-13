.class public La/n/K;
.super La/n/E;
.source ""


# annotations
.annotation system Ldalvik/annotation/MemberClasses;
    value = {
        La/n/K$a;
    }
.end annotation


# instance fields
.field private K:Ljava/util/ArrayList;
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "Ljava/util/ArrayList<",
            "La/n/E;",
            ">;"
        }
    .end annotation
.end field

.field private L:Z

.field M:I

.field N:Z

.field private O:I


# direct methods
.method public constructor <init>()V
    .locals 1

    invoke-direct {p0}, La/n/E;-><init>()V

    new-instance v0, Ljava/util/ArrayList;

    invoke-direct {v0}, Ljava/util/ArrayList;-><init>()V

    iput-object v0, p0, La/n/K;->K:Ljava/util/ArrayList;

    const/4 v0, 0x1

    iput-boolean v0, p0, La/n/K;->L:Z

    const/4 v0, 0x0

    iput-boolean v0, p0, La/n/K;->N:Z

    iput v0, p0, La/n/K;->O:I

    return-void
.end method

.method private q()V
    .locals 3

    new-instance v0, La/n/K$a;

    invoke-direct {v0, p0}, La/n/K$a;-><init>(La/n/K;)V

    iget-object v1, p0, La/n/K;->K:Ljava/util/ArrayList;

    invoke-virtual {v1}, Ljava/util/ArrayList;->iterator()Ljava/util/Iterator;

    move-result-object v1

    :goto_0
    invoke-interface {v1}, Ljava/util/Iterator;->hasNext()Z

    move-result v2

    if-eqz v2, :cond_0

    invoke-interface {v1}, Ljava/util/Iterator;->next()Ljava/lang/Object;

    move-result-object v2

    check-cast v2, La/n/E;

    invoke-virtual {v2, v0}, La/n/E;->a(La/n/E$c;)La/n/E;

    goto :goto_0

    :cond_0
    iget-object v0, p0, La/n/K;->K:Ljava/util/ArrayList;

    invoke-virtual {v0}, Ljava/util/ArrayList;->size()I

    move-result v0

    iput v0, p0, La/n/K;->M:I

    return-void
.end method


# virtual methods
.method public a(I)La/n/E;
    .locals 1

    if-ltz p1, :cond_1

    iget-object v0, p0, La/n/K;->K:Ljava/util/ArrayList;

    invoke-virtual {v0}, Ljava/util/ArrayList;->size()I

    move-result v0

    if-lt p1, v0, :cond_0

    goto :goto_0

    :cond_0
    iget-object v0, p0, La/n/K;->K:Ljava/util/ArrayList;

    invoke-virtual {v0, p1}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object p1

    check-cast p1, La/n/E;

    return-object p1

    :cond_1
    :goto_0
    const/4 p1, 0x0

    return-object p1
.end method

.method public bridge synthetic a(J)La/n/E;
    .locals 0

    invoke-virtual {p0, p1, p2}, La/n/K;->a(J)La/n/K;

    return-object p0
.end method

.method public bridge synthetic a(La/n/E$c;)La/n/E;
    .locals 0

    invoke-virtual {p0, p1}, La/n/K;->a(La/n/E$c;)La/n/K;

    move-result-object p1

    return-object p1
.end method

.method public bridge synthetic a(Landroid/animation/TimeInterpolator;)La/n/E;
    .locals 0

    invoke-virtual {p0, p1}, La/n/K;->a(Landroid/animation/TimeInterpolator;)La/n/K;

    move-result-object p1

    return-object p1
.end method

.method public bridge synthetic a(Landroid/view/View;)La/n/E;
    .locals 0

    invoke-virtual {p0, p1}, La/n/K;->a(Landroid/view/View;)La/n/K;

    move-result-object p1

    return-object p1
.end method

.method public a(J)La/n/K;
    .locals 4

    invoke-super {p0, p1, p2}, La/n/E;->a(J)La/n/E;

    iget-wide v0, p0, La/n/E;->f:J

    const-wide/16 v2, 0x0

    cmp-long v0, v0, v2

    if-ltz v0, :cond_0

    iget-object v0, p0, La/n/K;->K:Ljava/util/ArrayList;

    invoke-virtual {v0}, Ljava/util/ArrayList;->size()I

    move-result v0

    const/4 v1, 0x0

    :goto_0
    if-ge v1, v0, :cond_0

    iget-object v2, p0, La/n/K;->K:Ljava/util/ArrayList;

    invoke-virtual {v2, v1}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v2

    check-cast v2, La/n/E;

    invoke-virtual {v2, p1, p2}, La/n/E;->a(J)La/n/E;

    add-int/lit8 v1, v1, 0x1

    goto :goto_0

    :cond_0
    return-object p0
.end method

.method public a(La/n/E$c;)La/n/K;
    .locals 0

    invoke-super {p0, p1}, La/n/E;->a(La/n/E$c;)La/n/E;

    move-object p1, p0

    check-cast p1, La/n/K;

    return-object p1
.end method

.method public a(La/n/E;)La/n/K;
    .locals 4

    iget-object v0, p0, La/n/K;->K:Ljava/util/ArrayList;

    invoke-virtual {v0, p1}, Ljava/util/ArrayList;->add(Ljava/lang/Object;)Z

    iput-object p0, p1, La/n/E;->u:La/n/K;

    iget-wide v0, p0, La/n/E;->f:J

    const-wide/16 v2, 0x0

    cmp-long v2, v0, v2

    if-ltz v2, :cond_0

    invoke-virtual {p1, v0, v1}, La/n/E;->a(J)La/n/E;

    :cond_0
    iget v0, p0, La/n/K;->O:I

    and-int/lit8 v0, v0, 0x1

    if-eqz v0, :cond_1

    invoke-virtual {p0}, La/n/E;->d()Landroid/animation/TimeInterpolator;

    move-result-object v0

    invoke-virtual {p1, v0}, La/n/E;->a(Landroid/animation/TimeInterpolator;)La/n/E;

    :cond_1
    iget v0, p0, La/n/K;->O:I

    and-int/lit8 v0, v0, 0x2

    if-eqz v0, :cond_2

    invoke-virtual {p0}, La/n/E;->g()La/n/I;

    move-result-object v0

    invoke-virtual {p1, v0}, La/n/E;->a(La/n/I;)V

    :cond_2
    iget v0, p0, La/n/K;->O:I

    and-int/lit8 v0, v0, 0x4

    if-eqz v0, :cond_3

    invoke-virtual {p0}, La/n/E;->f()La/n/v;

    move-result-object v0

    invoke-virtual {p1, v0}, La/n/E;->a(La/n/v;)V

    :cond_3
    iget v0, p0, La/n/K;->O:I

    and-int/lit8 v0, v0, 0x8

    if-eqz v0, :cond_4

    invoke-virtual {p0}, La/n/E;->c()La/n/E$b;

    move-result-object v0

    invoke-virtual {p1, v0}, La/n/E;->a(La/n/E$b;)V

    :cond_4
    return-object p0
.end method

.method public a(Landroid/animation/TimeInterpolator;)La/n/K;
    .locals 3

    iget v0, p0, La/n/K;->O:I

    or-int/lit8 v0, v0, 0x1

    iput v0, p0, La/n/K;->O:I

    iget-object v0, p0, La/n/K;->K:Ljava/util/ArrayList;

    if-eqz v0, :cond_0

    invoke-virtual {v0}, Ljava/util/ArrayList;->size()I

    move-result v0

    const/4 v1, 0x0

    :goto_0
    if-ge v1, v0, :cond_0

    iget-object v2, p0, La/n/K;->K:Ljava/util/ArrayList;

    invoke-virtual {v2, v1}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v2

    check-cast v2, La/n/E;

    invoke-virtual {v2, p1}, La/n/E;->a(Landroid/animation/TimeInterpolator;)La/n/E;

    add-int/lit8 v1, v1, 0x1

    goto :goto_0

    :cond_0
    invoke-super {p0, p1}, La/n/E;->a(Landroid/animation/TimeInterpolator;)La/n/E;

    move-object p1, p0

    check-cast p1, La/n/K;

    return-object p1
.end method

.method public a(Landroid/view/View;)La/n/K;
    .locals 2

    const/4 v0, 0x0

    :goto_0
    iget-object v1, p0, La/n/K;->K:Ljava/util/ArrayList;

    invoke-virtual {v1}, Ljava/util/ArrayList;->size()I

    move-result v1

    if-ge v0, v1, :cond_0

    iget-object v1, p0, La/n/K;->K:Ljava/util/ArrayList;

    invoke-virtual {v1, v0}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v1

    check-cast v1, La/n/E;

    invoke-virtual {v1, p1}, La/n/E;->a(Landroid/view/View;)La/n/E;

    add-int/lit8 v0, v0, 0x1

    goto :goto_0

    :cond_0
    invoke-super {p0, p1}, La/n/E;->a(Landroid/view/View;)La/n/E;

    move-object p1, p0

    check-cast p1, La/n/K;

    return-object p1
.end method

.method a(Ljava/lang/String;)Ljava/lang/String;
    .locals 5

    invoke-super {p0, p1}, La/n/E;->a(Ljava/lang/String;)Ljava/lang/String;

    move-result-object v0

    const/4 v1, 0x0

    :goto_0
    iget-object v2, p0, La/n/K;->K:Ljava/util/ArrayList;

    invoke-virtual {v2}, Ljava/util/ArrayList;->size()I

    move-result v2

    if-ge v1, v2, :cond_0

    new-instance v2, Ljava/lang/StringBuilder;

    invoke-direct {v2}, Ljava/lang/StringBuilder;-><init>()V

    invoke-virtual {v2, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    const-string v0, "\n"

    invoke-virtual {v2, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    iget-object v0, p0, La/n/K;->K:Ljava/util/ArrayList;

    invoke-virtual {v0, v1}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v0

    check-cast v0, La/n/E;

    new-instance v3, Ljava/lang/StringBuilder;

    invoke-direct {v3}, Ljava/lang/StringBuilder;-><init>()V

    invoke-virtual {v3, p1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    const-string v4, "  "

    invoke-virtual {v3, v4}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v3}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v3

    invoke-virtual {v0, v3}, La/n/E;->a(Ljava/lang/String;)Ljava/lang/String;

    move-result-object v0

    invoke-virtual {v2, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v2}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    add-int/lit8 v1, v1, 0x1

    goto :goto_0

    :cond_0
    return-object v0
.end method

.method public a(La/n/E$b;)V
    .locals 3

    invoke-super {p0, p1}, La/n/E;->a(La/n/E$b;)V

    iget v0, p0, La/n/K;->O:I

    or-int/lit8 v0, v0, 0x8

    iput v0, p0, La/n/K;->O:I

    iget-object v0, p0, La/n/K;->K:Ljava/util/ArrayList;

    invoke-virtual {v0}, Ljava/util/ArrayList;->size()I

    move-result v0

    const/4 v1, 0x0

    :goto_0
    if-ge v1, v0, :cond_0

    iget-object v2, p0, La/n/K;->K:Ljava/util/ArrayList;

    invoke-virtual {v2, v1}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v2

    check-cast v2, La/n/E;

    invoke-virtual {v2, p1}, La/n/E;->a(La/n/E$b;)V

    add-int/lit8 v1, v1, 0x1

    goto :goto_0

    :cond_0
    return-void
.end method

.method public a(La/n/I;)V
    .locals 3

    invoke-super {p0, p1}, La/n/E;->a(La/n/I;)V

    iget v0, p0, La/n/K;->O:I

    or-int/lit8 v0, v0, 0x2

    iput v0, p0, La/n/K;->O:I

    iget-object v0, p0, La/n/K;->K:Ljava/util/ArrayList;

    invoke-virtual {v0}, Ljava/util/ArrayList;->size()I

    move-result v0

    const/4 v1, 0x0

    :goto_0
    if-ge v1, v0, :cond_0

    iget-object v2, p0, La/n/K;->K:Ljava/util/ArrayList;

    invoke-virtual {v2, v1}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v2

    check-cast v2, La/n/E;

    invoke-virtual {v2, p1}, La/n/E;->a(La/n/I;)V

    add-int/lit8 v1, v1, 0x1

    goto :goto_0

    :cond_0
    return-void
.end method

.method public a(La/n/M;)V
    .locals 3

    iget-object v0, p1, La/n/M;->b:Landroid/view/View;

    invoke-virtual {p0, v0}, La/n/E;->b(Landroid/view/View;)Z

    move-result v0

    if-eqz v0, :cond_1

    iget-object v0, p0, La/n/K;->K:Ljava/util/ArrayList;

    invoke-virtual {v0}, Ljava/util/ArrayList;->iterator()Ljava/util/Iterator;

    move-result-object v0

    :cond_0
    :goto_0
    invoke-interface {v0}, Ljava/util/Iterator;->hasNext()Z

    move-result v1

    if-eqz v1, :cond_1

    invoke-interface {v0}, Ljava/util/Iterator;->next()Ljava/lang/Object;

    move-result-object v1

    check-cast v1, La/n/E;

    iget-object v2, p1, La/n/M;->b:Landroid/view/View;

    invoke-virtual {v1, v2}, La/n/E;->b(Landroid/view/View;)Z

    move-result v2

    if-eqz v2, :cond_0

    invoke-virtual {v1, p1}, La/n/E;->a(La/n/M;)V

    iget-object v2, p1, La/n/M;->c:Ljava/util/ArrayList;

    invoke-virtual {v2, v1}, Ljava/util/ArrayList;->add(Ljava/lang/Object;)Z

    goto :goto_0

    :cond_1
    return-void
.end method

.method public a(La/n/v;)V
    .locals 2

    invoke-super {p0, p1}, La/n/E;->a(La/n/v;)V

    iget v0, p0, La/n/K;->O:I

    or-int/lit8 v0, v0, 0x4

    iput v0, p0, La/n/K;->O:I

    const/4 v0, 0x0

    :goto_0
    iget-object v1, p0, La/n/K;->K:Ljava/util/ArrayList;

    invoke-virtual {v1}, Ljava/util/ArrayList;->size()I

    move-result v1

    if-ge v0, v1, :cond_0

    iget-object v1, p0, La/n/K;->K:Ljava/util/ArrayList;

    invoke-virtual {v1, v0}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v1

    check-cast v1, La/n/E;

    invoke-virtual {v1, p1}, La/n/E;->a(La/n/v;)V

    add-int/lit8 v0, v0, 0x1

    goto :goto_0

    :cond_0
    return-void
.end method

.method protected a(Landroid/view/ViewGroup;La/n/N;La/n/N;Ljava/util/ArrayList;Ljava/util/ArrayList;)V
    .locals 12
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "(",
            "Landroid/view/ViewGroup;",
            "La/n/N;",
            "La/n/N;",
            "Ljava/util/ArrayList<",
            "La/n/M;",
            ">;",
            "Ljava/util/ArrayList<",
            "La/n/M;",
            ">;)V"
        }
    .end annotation

    move-object v0, p0

    invoke-virtual {p0}, La/n/E;->h()J

    move-result-wide v1

    iget-object v3, v0, La/n/K;->K:Ljava/util/ArrayList;

    invoke-virtual {v3}, Ljava/util/ArrayList;->size()I

    move-result v3

    const/4 v4, 0x0

    :goto_0
    if-ge v4, v3, :cond_3

    iget-object v5, v0, La/n/K;->K:Ljava/util/ArrayList;

    invoke-virtual {v5, v4}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v5

    move-object v6, v5

    check-cast v6, La/n/E;

    const-wide/16 v7, 0x0

    cmp-long v5, v1, v7

    if-lez v5, :cond_2

    iget-boolean v5, v0, La/n/K;->L:Z

    if-nez v5, :cond_0

    if-nez v4, :cond_2

    :cond_0
    invoke-virtual {v6}, La/n/E;->h()J

    move-result-wide v9

    cmp-long v5, v9, v7

    if-lez v5, :cond_1

    add-long/2addr v9, v1

    invoke-virtual {v6, v9, v10}, La/n/E;->b(J)La/n/E;

    goto :goto_1

    :cond_1
    invoke-virtual {v6, v1, v2}, La/n/E;->b(J)La/n/E;

    :cond_2
    :goto_1
    move-object v7, p1

    move-object v8, p2

    move-object v9, p3

    move-object/from16 v10, p4

    move-object/from16 v11, p5

    invoke-virtual/range {v6 .. v11}, La/n/E;->a(Landroid/view/ViewGroup;La/n/N;La/n/N;Ljava/util/ArrayList;Ljava/util/ArrayList;)V

    add-int/lit8 v4, v4, 0x1

    goto :goto_0

    :cond_3
    return-void
.end method

.method public bridge synthetic b(J)La/n/E;
    .locals 0

    invoke-virtual {p0, p1, p2}, La/n/K;->b(J)La/n/K;

    move-result-object p1

    return-object p1
.end method

.method public bridge synthetic b(La/n/E$c;)La/n/E;
    .locals 0

    invoke-virtual {p0, p1}, La/n/K;->b(La/n/E$c;)La/n/K;

    move-result-object p1

    return-object p1
.end method

.method public b(I)La/n/K;
    .locals 3

    const/4 v0, 0x1

    if-eqz p1, :cond_1

    if-ne p1, v0, :cond_0

    const/4 p1, 0x0

    iput-boolean p1, p0, La/n/K;->L:Z

    goto :goto_0

    :cond_0
    new-instance v0, Landroid/util/AndroidRuntimeException;

    new-instance v1, Ljava/lang/StringBuilder;

    invoke-direct {v1}, Ljava/lang/StringBuilder;-><init>()V

    const-string v2, "Invalid parameter for TransitionSet ordering: "

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v1, p1}, Ljava/lang/StringBuilder;->append(I)Ljava/lang/StringBuilder;

    invoke-virtual {v1}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object p1

    invoke-direct {v0, p1}, Landroid/util/AndroidRuntimeException;-><init>(Ljava/lang/String;)V

    throw v0

    :cond_1
    iput-boolean v0, p0, La/n/K;->L:Z

    :goto_0
    return-object p0
.end method

.method public b(J)La/n/K;
    .locals 0

    invoke-super {p0, p1, p2}, La/n/E;->b(J)La/n/E;

    move-object p1, p0

    check-cast p1, La/n/K;

    return-object p1
.end method

.method public b(La/n/E$c;)La/n/K;
    .locals 0

    invoke-super {p0, p1}, La/n/E;->b(La/n/E$c;)La/n/E;

    move-object p1, p0

    check-cast p1, La/n/K;

    return-object p1
.end method

.method b(La/n/M;)V
    .locals 3

    invoke-super {p0, p1}, La/n/E;->b(La/n/M;)V

    iget-object v0, p0, La/n/K;->K:Ljava/util/ArrayList;

    invoke-virtual {v0}, Ljava/util/ArrayList;->size()I

    move-result v0

    const/4 v1, 0x0

    :goto_0
    if-ge v1, v0, :cond_0

    iget-object v2, p0, La/n/K;->K:Ljava/util/ArrayList;

    invoke-virtual {v2, v1}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v2

    check-cast v2, La/n/E;

    invoke-virtual {v2, p1}, La/n/E;->b(La/n/M;)V

    add-int/lit8 v1, v1, 0x1

    goto :goto_0

    :cond_0
    return-void
.end method

.method public c(La/n/M;)V
    .locals 3

    iget-object v0, p1, La/n/M;->b:Landroid/view/View;

    invoke-virtual {p0, v0}, La/n/E;->b(Landroid/view/View;)Z

    move-result v0

    if-eqz v0, :cond_1

    iget-object v0, p0, La/n/K;->K:Ljava/util/ArrayList;

    invoke-virtual {v0}, Ljava/util/ArrayList;->iterator()Ljava/util/Iterator;

    move-result-object v0

    :cond_0
    :goto_0
    invoke-interface {v0}, Ljava/util/Iterator;->hasNext()Z

    move-result v1

    if-eqz v1, :cond_1

    invoke-interface {v0}, Ljava/util/Iterator;->next()Ljava/lang/Object;

    move-result-object v1

    check-cast v1, La/n/E;

    iget-object v2, p1, La/n/M;->b:Landroid/view/View;

    invoke-virtual {v1, v2}, La/n/E;->b(Landroid/view/View;)Z

    move-result v2

    if-eqz v2, :cond_0

    invoke-virtual {v1, p1}, La/n/E;->c(La/n/M;)V

    iget-object v2, p1, La/n/M;->c:Ljava/util/ArrayList;

    invoke-virtual {v2, v1}, Ljava/util/ArrayList;->add(Ljava/lang/Object;)Z

    goto :goto_0

    :cond_1
    return-void
.end method

.method public c(Landroid/view/View;)V
    .locals 3

    invoke-super {p0, p1}, La/n/E;->c(Landroid/view/View;)V

    iget-object v0, p0, La/n/K;->K:Ljava/util/ArrayList;

    invoke-virtual {v0}, Ljava/util/ArrayList;->size()I

    move-result v0

    const/4 v1, 0x0

    :goto_0
    if-ge v1, v0, :cond_0

    iget-object v2, p0, La/n/K;->K:Ljava/util/ArrayList;

    invoke-virtual {v2, v1}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v2

    check-cast v2, La/n/E;

    invoke-virtual {v2, p1}, La/n/E;->c(Landroid/view/View;)V

    add-int/lit8 v1, v1, 0x1

    goto :goto_0

    :cond_0
    return-void
.end method

.method public clone()La/n/E;
    .locals 4

    invoke-super {p0}, La/n/E;->clone()La/n/E;

    move-result-object v0

    check-cast v0, La/n/K;

    new-instance v1, Ljava/util/ArrayList;

    invoke-direct {v1}, Ljava/util/ArrayList;-><init>()V

    iput-object v1, v0, La/n/K;->K:Ljava/util/ArrayList;

    iget-object v1, p0, La/n/K;->K:Ljava/util/ArrayList;

    invoke-virtual {v1}, Ljava/util/ArrayList;->size()I

    move-result v1

    const/4 v2, 0x0

    :goto_0
    if-ge v2, v1, :cond_0

    iget-object v3, p0, La/n/K;->K:Ljava/util/ArrayList;

    invoke-virtual {v3, v2}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v3

    check-cast v3, La/n/E;

    invoke-virtual {v3}, La/n/E;->clone()La/n/E;

    move-result-object v3

    invoke-virtual {v0, v3}, La/n/K;->a(La/n/E;)La/n/K;

    add-int/lit8 v2, v2, 0x1

    goto :goto_0

    :cond_0
    return-object v0
.end method

.method public bridge synthetic clone()Ljava/lang/Object;
    .locals 1

    invoke-virtual {p0}, La/n/K;->clone()La/n/E;

    move-result-object v0

    return-object v0
.end method

.method public bridge synthetic d(Landroid/view/View;)La/n/E;
    .locals 0

    invoke-virtual {p0, p1}, La/n/K;->d(Landroid/view/View;)La/n/K;

    move-result-object p1

    return-object p1
.end method

.method public d(Landroid/view/View;)La/n/K;
    .locals 2

    const/4 v0, 0x0

    :goto_0
    iget-object v1, p0, La/n/K;->K:Ljava/util/ArrayList;

    invoke-virtual {v1}, Ljava/util/ArrayList;->size()I

    move-result v1

    if-ge v0, v1, :cond_0

    iget-object v1, p0, La/n/K;->K:Ljava/util/ArrayList;

    invoke-virtual {v1, v0}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v1

    check-cast v1, La/n/E;

    invoke-virtual {v1, p1}, La/n/E;->d(Landroid/view/View;)La/n/E;

    add-int/lit8 v0, v0, 0x1

    goto :goto_0

    :cond_0
    invoke-super {p0, p1}, La/n/E;->d(Landroid/view/View;)La/n/E;

    move-object p1, p0

    check-cast p1, La/n/K;

    return-object p1
.end method

.method public e(Landroid/view/View;)V
    .locals 3

    invoke-super {p0, p1}, La/n/E;->e(Landroid/view/View;)V

    iget-object v0, p0, La/n/K;->K:Ljava/util/ArrayList;

    invoke-virtual {v0}, Ljava/util/ArrayList;->size()I

    move-result v0

    const/4 v1, 0x0

    :goto_0
    if-ge v1, v0, :cond_0

    iget-object v2, p0, La/n/K;->K:Ljava/util/ArrayList;

    invoke-virtual {v2, v1}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v2

    check-cast v2, La/n/E;

    invoke-virtual {v2, p1}, La/n/E;->e(Landroid/view/View;)V

    add-int/lit8 v1, v1, 0x1

    goto :goto_0

    :cond_0
    return-void
.end method

.method protected n()V
    .locals 4

    iget-object v0, p0, La/n/K;->K:Ljava/util/ArrayList;

    invoke-virtual {v0}, Ljava/util/ArrayList;->isEmpty()Z

    move-result v0

    if-eqz v0, :cond_0

    invoke-virtual {p0}, La/n/E;->o()V

    invoke-virtual {p0}, La/n/E;->a()V

    return-void

    :cond_0
    invoke-direct {p0}, La/n/K;->q()V

    iget-boolean v0, p0, La/n/K;->L:Z

    if-nez v0, :cond_2

    const/4 v0, 0x1

    :goto_0
    iget-object v1, p0, La/n/K;->K:Ljava/util/ArrayList;

    invoke-virtual {v1}, Ljava/util/ArrayList;->size()I

    move-result v1

    if-ge v0, v1, :cond_1

    iget-object v1, p0, La/n/K;->K:Ljava/util/ArrayList;

    add-int/lit8 v2, v0, -0x1

    invoke-virtual {v1, v2}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v1

    check-cast v1, La/n/E;

    iget-object v2, p0, La/n/K;->K:Ljava/util/ArrayList;

    invoke-virtual {v2, v0}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v2

    check-cast v2, La/n/E;

    new-instance v3, La/n/J;

    invoke-direct {v3, p0, v2}, La/n/J;-><init>(La/n/K;La/n/E;)V

    invoke-virtual {v1, v3}, La/n/E;->a(La/n/E$c;)La/n/E;

    add-int/lit8 v0, v0, 0x1

    goto :goto_0

    :cond_1
    iget-object v0, p0, La/n/K;->K:Ljava/util/ArrayList;

    const/4 v1, 0x0

    invoke-virtual {v0, v1}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v0

    check-cast v0, La/n/E;

    if-eqz v0, :cond_3

    invoke-virtual {v0}, La/n/E;->n()V

    goto :goto_2

    :cond_2
    iget-object v0, p0, La/n/K;->K:Ljava/util/ArrayList;

    invoke-virtual {v0}, Ljava/util/ArrayList;->iterator()Ljava/util/Iterator;

    move-result-object v0

    :goto_1
    invoke-interface {v0}, Ljava/util/Iterator;->hasNext()Z

    move-result v1

    if-eqz v1, :cond_3

    invoke-interface {v0}, Ljava/util/Iterator;->next()Ljava/lang/Object;

    move-result-object v1

    check-cast v1, La/n/E;

    invoke-virtual {v1}, La/n/E;->n()V

    goto :goto_1

    :cond_3
    :goto_2
    return-void
.end method

.method public p()I
    .locals 1

    iget-object v0, p0, La/n/K;->K:Ljava/util/ArrayList;

    invoke-virtual {v0}, Ljava/util/ArrayList;->size()I

    move-result v0

    return v0
.end method
