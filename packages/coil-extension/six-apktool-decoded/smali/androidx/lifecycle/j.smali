.class public Landroidx/lifecycle/j;
.super Landroidx/lifecycle/f;
.source ""


# annotations
.annotation system Ldalvik/annotation/MemberClasses;
    value = {
        Landroidx/lifecycle/j$a;
    }
.end annotation


# instance fields
.field private a:La/b/a/b/a;
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "La/b/a/b/a<",
            "Landroidx/lifecycle/g;",
            "Landroidx/lifecycle/j$a;",
            ">;"
        }
    .end annotation
.end field

.field private b:Landroidx/lifecycle/f$b;

.field private final c:Ljava/lang/ref/WeakReference;
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "Ljava/lang/ref/WeakReference<",
            "Landroidx/lifecycle/h;",
            ">;"
        }
    .end annotation
.end field

.field private d:I

.field private e:Z

.field private f:Z

.field private g:Ljava/util/ArrayList;
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "Ljava/util/ArrayList<",
            "Landroidx/lifecycle/f$b;",
            ">;"
        }
    .end annotation
.end field


# direct methods
.method public constructor <init>(Landroidx/lifecycle/h;)V
    .locals 1

    invoke-direct {p0}, Landroidx/lifecycle/f;-><init>()V

    new-instance v0, La/b/a/b/a;

    invoke-direct {v0}, La/b/a/b/a;-><init>()V

    iput-object v0, p0, Landroidx/lifecycle/j;->a:La/b/a/b/a;

    const/4 v0, 0x0

    iput v0, p0, Landroidx/lifecycle/j;->d:I

    iput-boolean v0, p0, Landroidx/lifecycle/j;->e:Z

    iput-boolean v0, p0, Landroidx/lifecycle/j;->f:Z

    new-instance v0, Ljava/util/ArrayList;

    invoke-direct {v0}, Ljava/util/ArrayList;-><init>()V

    iput-object v0, p0, Landroidx/lifecycle/j;->g:Ljava/util/ArrayList;

    new-instance v0, Ljava/lang/ref/WeakReference;

    invoke-direct {v0, p1}, Ljava/lang/ref/WeakReference;-><init>(Ljava/lang/Object;)V

    iput-object v0, p0, Landroidx/lifecycle/j;->c:Ljava/lang/ref/WeakReference;

    sget-object p1, Landroidx/lifecycle/f$b;->b:Landroidx/lifecycle/f$b;

    iput-object p1, p0, Landroidx/lifecycle/j;->b:Landroidx/lifecycle/f$b;

    return-void
.end method

.method static a(Landroidx/lifecycle/f$a;)Landroidx/lifecycle/f$b;
    .locals 3

    sget-object v0, Landroidx/lifecycle/i;->a:[I

    invoke-virtual {p0}, Ljava/lang/Enum;->ordinal()I

    move-result v1

    aget v0, v0, v1

    packed-switch v0, :pswitch_data_0

    new-instance v0, Ljava/lang/IllegalArgumentException;

    new-instance v1, Ljava/lang/StringBuilder;

    invoke-direct {v1}, Ljava/lang/StringBuilder;-><init>()V

    const-string v2, "Unexpected event value "

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v1, p0}, Ljava/lang/StringBuilder;->append(Ljava/lang/Object;)Ljava/lang/StringBuilder;

    invoke-virtual {v1}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object p0

    invoke-direct {v0, p0}, Ljava/lang/IllegalArgumentException;-><init>(Ljava/lang/String;)V

    throw v0

    :pswitch_0
    sget-object p0, Landroidx/lifecycle/f$b;->a:Landroidx/lifecycle/f$b;

    return-object p0

    :pswitch_1
    sget-object p0, Landroidx/lifecycle/f$b;->e:Landroidx/lifecycle/f$b;

    return-object p0

    :pswitch_2
    sget-object p0, Landroidx/lifecycle/f$b;->d:Landroidx/lifecycle/f$b;

    return-object p0

    :pswitch_3
    sget-object p0, Landroidx/lifecycle/f$b;->c:Landroidx/lifecycle/f$b;

    return-object p0

    :pswitch_data_0
    .packed-switch 0x1
        :pswitch_3
        :pswitch_3
        :pswitch_2
        :pswitch_2
        :pswitch_1
        :pswitch_0
    .end packed-switch
.end method

.method static a(Landroidx/lifecycle/f$b;Landroidx/lifecycle/f$b;)Landroidx/lifecycle/f$b;
    .locals 1

    if-eqz p1, :cond_0

    invoke-virtual {p1, p0}, Ljava/lang/Enum;->compareTo(Ljava/lang/Enum;)I

    move-result v0

    if-gez v0, :cond_0

    move-object p0, p1

    :cond_0
    return-object p0
.end method

.method private a(Landroidx/lifecycle/h;)V
    .locals 5

    iget-object v0, p0, Landroidx/lifecycle/j;->a:La/b/a/b/a;

    invoke-virtual {v0}, La/b/a/b/b;->descendingIterator()Ljava/util/Iterator;

    move-result-object v0

    :cond_0
    invoke-interface {v0}, Ljava/util/Iterator;->hasNext()Z

    move-result v1

    if-eqz v1, :cond_1

    iget-boolean v1, p0, Landroidx/lifecycle/j;->f:Z

    if-nez v1, :cond_1

    invoke-interface {v0}, Ljava/util/Iterator;->next()Ljava/lang/Object;

    move-result-object v1

    check-cast v1, Ljava/util/Map$Entry;

    invoke-interface {v1}, Ljava/util/Map$Entry;->getValue()Ljava/lang/Object;

    move-result-object v2

    check-cast v2, Landroidx/lifecycle/j$a;

    :goto_0
    iget-object v3, v2, Landroidx/lifecycle/j$a;->a:Landroidx/lifecycle/f$b;

    iget-object v4, p0, Landroidx/lifecycle/j;->b:Landroidx/lifecycle/f$b;

    invoke-virtual {v3, v4}, Ljava/lang/Enum;->compareTo(Ljava/lang/Enum;)I

    move-result v3

    if-lez v3, :cond_0

    iget-boolean v3, p0, Landroidx/lifecycle/j;->f:Z

    if-nez v3, :cond_0

    iget-object v3, p0, Landroidx/lifecycle/j;->a:La/b/a/b/a;

    invoke-interface {v1}, Ljava/util/Map$Entry;->getKey()Ljava/lang/Object;

    move-result-object v4

    invoke-virtual {v3, v4}, La/b/a/b/a;->contains(Ljava/lang/Object;)Z

    move-result v3

    if-eqz v3, :cond_0

    iget-object v3, v2, Landroidx/lifecycle/j$a;->a:Landroidx/lifecycle/f$b;

    invoke-static {v3}, Landroidx/lifecycle/j;->b(Landroidx/lifecycle/f$b;)Landroidx/lifecycle/f$a;

    move-result-object v3

    invoke-static {v3}, Landroidx/lifecycle/j;->a(Landroidx/lifecycle/f$a;)Landroidx/lifecycle/f$b;

    move-result-object v4

    invoke-direct {p0, v4}, Landroidx/lifecycle/j;->d(Landroidx/lifecycle/f$b;)V

    invoke-virtual {v2, p1, v3}, Landroidx/lifecycle/j$a;->a(Landroidx/lifecycle/h;Landroidx/lifecycle/f$a;)V

    invoke-direct {p0}, Landroidx/lifecycle/j;->c()V

    goto :goto_0

    :cond_1
    return-void
.end method

.method private static b(Landroidx/lifecycle/f$b;)Landroidx/lifecycle/f$a;
    .locals 3

    sget-object v0, Landroidx/lifecycle/i;->b:[I

    invoke-virtual {p0}, Ljava/lang/Enum;->ordinal()I

    move-result v1

    aget v0, v0, v1

    const/4 v1, 0x1

    if-eq v0, v1, :cond_4

    const/4 v1, 0x2

    if-eq v0, v1, :cond_3

    const/4 v1, 0x3

    if-eq v0, v1, :cond_2

    const/4 v1, 0x4

    if-eq v0, v1, :cond_1

    const/4 v1, 0x5

    if-eq v0, v1, :cond_0

    new-instance v0, Ljava/lang/IllegalArgumentException;

    new-instance v1, Ljava/lang/StringBuilder;

    invoke-direct {v1}, Ljava/lang/StringBuilder;-><init>()V

    const-string v2, "Unexpected state value "

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v1, p0}, Ljava/lang/StringBuilder;->append(Ljava/lang/Object;)Ljava/lang/StringBuilder;

    invoke-virtual {v1}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object p0

    invoke-direct {v0, p0}, Ljava/lang/IllegalArgumentException;-><init>(Ljava/lang/String;)V

    throw v0

    :cond_0
    new-instance p0, Ljava/lang/IllegalArgumentException;

    invoke-direct {p0}, Ljava/lang/IllegalArgumentException;-><init>()V

    throw p0

    :cond_1
    sget-object p0, Landroidx/lifecycle/f$a;->ON_PAUSE:Landroidx/lifecycle/f$a;

    return-object p0

    :cond_2
    sget-object p0, Landroidx/lifecycle/f$a;->ON_STOP:Landroidx/lifecycle/f$a;

    return-object p0

    :cond_3
    sget-object p0, Landroidx/lifecycle/f$a;->ON_DESTROY:Landroidx/lifecycle/f$a;

    return-object p0

    :cond_4
    new-instance p0, Ljava/lang/IllegalArgumentException;

    invoke-direct {p0}, Ljava/lang/IllegalArgumentException;-><init>()V

    throw p0
.end method

.method private b(Landroidx/lifecycle/h;)V
    .locals 5

    iget-object v0, p0, Landroidx/lifecycle/j;->a:La/b/a/b/a;

    invoke-virtual {v0}, La/b/a/b/b;->b()La/b/a/b/b$d;

    move-result-object v0

    :cond_0
    invoke-interface {v0}, Ljava/util/Iterator;->hasNext()Z

    move-result v1

    if-eqz v1, :cond_1

    iget-boolean v1, p0, Landroidx/lifecycle/j;->f:Z

    if-nez v1, :cond_1

    invoke-interface {v0}, Ljava/util/Iterator;->next()Ljava/lang/Object;

    move-result-object v1

    check-cast v1, Ljava/util/Map$Entry;

    invoke-interface {v1}, Ljava/util/Map$Entry;->getValue()Ljava/lang/Object;

    move-result-object v2

    check-cast v2, Landroidx/lifecycle/j$a;

    :goto_0
    iget-object v3, v2, Landroidx/lifecycle/j$a;->a:Landroidx/lifecycle/f$b;

    iget-object v4, p0, Landroidx/lifecycle/j;->b:Landroidx/lifecycle/f$b;

    invoke-virtual {v3, v4}, Ljava/lang/Enum;->compareTo(Ljava/lang/Enum;)I

    move-result v3

    if-gez v3, :cond_0

    iget-boolean v3, p0, Landroidx/lifecycle/j;->f:Z

    if-nez v3, :cond_0

    iget-object v3, p0, Landroidx/lifecycle/j;->a:La/b/a/b/a;

    invoke-interface {v1}, Ljava/util/Map$Entry;->getKey()Ljava/lang/Object;

    move-result-object v4

    invoke-virtual {v3, v4}, La/b/a/b/a;->contains(Ljava/lang/Object;)Z

    move-result v3

    if-eqz v3, :cond_0

    iget-object v3, v2, Landroidx/lifecycle/j$a;->a:Landroidx/lifecycle/f$b;

    invoke-direct {p0, v3}, Landroidx/lifecycle/j;->d(Landroidx/lifecycle/f$b;)V

    iget-object v3, v2, Landroidx/lifecycle/j$a;->a:Landroidx/lifecycle/f$b;

    invoke-static {v3}, Landroidx/lifecycle/j;->e(Landroidx/lifecycle/f$b;)Landroidx/lifecycle/f$a;

    move-result-object v3

    invoke-virtual {v2, p1, v3}, Landroidx/lifecycle/j$a;->a(Landroidx/lifecycle/h;Landroidx/lifecycle/f$a;)V

    invoke-direct {p0}, Landroidx/lifecycle/j;->c()V

    goto :goto_0

    :cond_1
    return-void
.end method

.method private b()Z
    .locals 3

    iget-object v0, p0, Landroidx/lifecycle/j;->a:La/b/a/b/a;

    invoke-virtual {v0}, La/b/a/b/b;->size()I

    move-result v0

    const/4 v1, 0x1

    if-nez v0, :cond_0

    return v1

    :cond_0
    iget-object v0, p0, Landroidx/lifecycle/j;->a:La/b/a/b/a;

    invoke-virtual {v0}, La/b/a/b/b;->a()Ljava/util/Map$Entry;

    move-result-object v0

    invoke-interface {v0}, Ljava/util/Map$Entry;->getValue()Ljava/lang/Object;

    move-result-object v0

    check-cast v0, Landroidx/lifecycle/j$a;

    iget-object v0, v0, Landroidx/lifecycle/j$a;->a:Landroidx/lifecycle/f$b;

    iget-object v2, p0, Landroidx/lifecycle/j;->a:La/b/a/b/a;

    invoke-virtual {v2}, La/b/a/b/b;->c()Ljava/util/Map$Entry;

    move-result-object v2

    invoke-interface {v2}, Ljava/util/Map$Entry;->getValue()Ljava/lang/Object;

    move-result-object v2

    check-cast v2, Landroidx/lifecycle/j$a;

    iget-object v2, v2, Landroidx/lifecycle/j$a;->a:Landroidx/lifecycle/f$b;

    if-ne v0, v2, :cond_1

    iget-object v0, p0, Landroidx/lifecycle/j;->b:Landroidx/lifecycle/f$b;

    if-ne v0, v2, :cond_1

    goto :goto_0

    :cond_1
    const/4 v1, 0x0

    :goto_0
    return v1
.end method

.method private c(Landroidx/lifecycle/g;)Landroidx/lifecycle/f$b;
    .locals 2

    iget-object v0, p0, Landroidx/lifecycle/j;->a:La/b/a/b/a;

    invoke-virtual {v0, p1}, La/b/a/b/a;->b(Ljava/lang/Object;)Ljava/util/Map$Entry;

    move-result-object p1

    const/4 v0, 0x0

    if-eqz p1, :cond_0

    invoke-interface {p1}, Ljava/util/Map$Entry;->getValue()Ljava/lang/Object;

    move-result-object p1

    check-cast p1, Landroidx/lifecycle/j$a;

    iget-object p1, p1, Landroidx/lifecycle/j$a;->a:Landroidx/lifecycle/f$b;

    goto :goto_0

    :cond_0
    move-object p1, v0

    :goto_0
    iget-object v1, p0, Landroidx/lifecycle/j;->g:Ljava/util/ArrayList;

    invoke-virtual {v1}, Ljava/util/ArrayList;->isEmpty()Z

    move-result v1

    if-nez v1, :cond_1

    iget-object v0, p0, Landroidx/lifecycle/j;->g:Ljava/util/ArrayList;

    invoke-virtual {v0}, Ljava/util/ArrayList;->size()I

    move-result v1

    add-int/lit8 v1, v1, -0x1

    invoke-virtual {v0, v1}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v0

    check-cast v0, Landroidx/lifecycle/f$b;

    :cond_1
    iget-object v1, p0, Landroidx/lifecycle/j;->b:Landroidx/lifecycle/f$b;

    invoke-static {v1, p1}, Landroidx/lifecycle/j;->a(Landroidx/lifecycle/f$b;Landroidx/lifecycle/f$b;)Landroidx/lifecycle/f$b;

    move-result-object p1

    invoke-static {p1, v0}, Landroidx/lifecycle/j;->a(Landroidx/lifecycle/f$b;Landroidx/lifecycle/f$b;)Landroidx/lifecycle/f$b;

    move-result-object p1

    return-object p1
.end method

.method private c()V
    .locals 2

    iget-object v0, p0, Landroidx/lifecycle/j;->g:Ljava/util/ArrayList;

    invoke-virtual {v0}, Ljava/util/ArrayList;->size()I

    move-result v1

    add-int/lit8 v1, v1, -0x1

    invoke-virtual {v0, v1}, Ljava/util/ArrayList;->remove(I)Ljava/lang/Object;

    return-void
.end method

.method private c(Landroidx/lifecycle/f$b;)V
    .locals 1

    iget-object v0, p0, Landroidx/lifecycle/j;->b:Landroidx/lifecycle/f$b;

    if-ne v0, p1, :cond_0

    return-void

    :cond_0
    iput-object p1, p0, Landroidx/lifecycle/j;->b:Landroidx/lifecycle/f$b;

    iget-boolean p1, p0, Landroidx/lifecycle/j;->e:Z

    const/4 v0, 0x1

    if-nez p1, :cond_2

    iget p1, p0, Landroidx/lifecycle/j;->d:I

    if-eqz p1, :cond_1

    goto :goto_0

    :cond_1
    iput-boolean v0, p0, Landroidx/lifecycle/j;->e:Z

    invoke-direct {p0}, Landroidx/lifecycle/j;->d()V

    const/4 p1, 0x0

    iput-boolean p1, p0, Landroidx/lifecycle/j;->e:Z

    return-void

    :cond_2
    :goto_0
    iput-boolean v0, p0, Landroidx/lifecycle/j;->f:Z

    return-void
.end method

.method private d()V
    .locals 3

    iget-object v0, p0, Landroidx/lifecycle/j;->c:Ljava/lang/ref/WeakReference;

    invoke-virtual {v0}, Ljava/lang/ref/WeakReference;->get()Ljava/lang/Object;

    move-result-object v0

    check-cast v0, Landroidx/lifecycle/h;

    if-nez v0, :cond_0

    const-string v0, "LifecycleRegistry"

    const-string v1, "LifecycleOwner is garbage collected, you shouldn\'t try dispatch new events from it."

    invoke-static {v0, v1}, Landroid/util/Log;->w(Ljava/lang/String;Ljava/lang/String;)I

    return-void

    :cond_0
    :goto_0
    invoke-direct {p0}, Landroidx/lifecycle/j;->b()Z

    move-result v1

    const/4 v2, 0x0

    if-nez v1, :cond_2

    iput-boolean v2, p0, Landroidx/lifecycle/j;->f:Z

    iget-object v1, p0, Landroidx/lifecycle/j;->b:Landroidx/lifecycle/f$b;

    iget-object v2, p0, Landroidx/lifecycle/j;->a:La/b/a/b/a;

    invoke-virtual {v2}, La/b/a/b/b;->a()Ljava/util/Map$Entry;

    move-result-object v2

    invoke-interface {v2}, Ljava/util/Map$Entry;->getValue()Ljava/lang/Object;

    move-result-object v2

    check-cast v2, Landroidx/lifecycle/j$a;

    iget-object v2, v2, Landroidx/lifecycle/j$a;->a:Landroidx/lifecycle/f$b;

    invoke-virtual {v1, v2}, Ljava/lang/Enum;->compareTo(Ljava/lang/Enum;)I

    move-result v1

    if-gez v1, :cond_1

    invoke-direct {p0, v0}, Landroidx/lifecycle/j;->a(Landroidx/lifecycle/h;)V

    :cond_1
    iget-object v1, p0, Landroidx/lifecycle/j;->a:La/b/a/b/a;

    invoke-virtual {v1}, La/b/a/b/b;->c()Ljava/util/Map$Entry;

    move-result-object v1

    iget-boolean v2, p0, Landroidx/lifecycle/j;->f:Z

    if-nez v2, :cond_0

    if-eqz v1, :cond_0

    iget-object v2, p0, Landroidx/lifecycle/j;->b:Landroidx/lifecycle/f$b;

    invoke-interface {v1}, Ljava/util/Map$Entry;->getValue()Ljava/lang/Object;

    move-result-object v1

    check-cast v1, Landroidx/lifecycle/j$a;

    iget-object v1, v1, Landroidx/lifecycle/j$a;->a:Landroidx/lifecycle/f$b;

    invoke-virtual {v2, v1}, Ljava/lang/Enum;->compareTo(Ljava/lang/Enum;)I

    move-result v1

    if-lez v1, :cond_0

    invoke-direct {p0, v0}, Landroidx/lifecycle/j;->b(Landroidx/lifecycle/h;)V

    goto :goto_0

    :cond_2
    iput-boolean v2, p0, Landroidx/lifecycle/j;->f:Z

    return-void
.end method

.method private d(Landroidx/lifecycle/f$b;)V
    .locals 1

    iget-object v0, p0, Landroidx/lifecycle/j;->g:Ljava/util/ArrayList;

    invoke-virtual {v0, p1}, Ljava/util/ArrayList;->add(Ljava/lang/Object;)Z

    return-void
.end method

.method private static e(Landroidx/lifecycle/f$b;)Landroidx/lifecycle/f$a;
    .locals 3

    sget-object v0, Landroidx/lifecycle/i;->b:[I

    invoke-virtual {p0}, Ljava/lang/Enum;->ordinal()I

    move-result v1

    aget v0, v0, v1

    const/4 v1, 0x1

    if-eq v0, v1, :cond_4

    const/4 v1, 0x2

    if-eq v0, v1, :cond_3

    const/4 v1, 0x3

    if-eq v0, v1, :cond_2

    const/4 v1, 0x4

    if-eq v0, v1, :cond_1

    const/4 v1, 0x5

    if-ne v0, v1, :cond_0

    goto :goto_0

    :cond_0
    new-instance v0, Ljava/lang/IllegalArgumentException;

    new-instance v1, Ljava/lang/StringBuilder;

    invoke-direct {v1}, Ljava/lang/StringBuilder;-><init>()V

    const-string v2, "Unexpected state value "

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v1, p0}, Ljava/lang/StringBuilder;->append(Ljava/lang/Object;)Ljava/lang/StringBuilder;

    invoke-virtual {v1}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object p0

    invoke-direct {v0, p0}, Ljava/lang/IllegalArgumentException;-><init>(Ljava/lang/String;)V

    throw v0

    :cond_1
    new-instance p0, Ljava/lang/IllegalArgumentException;

    invoke-direct {p0}, Ljava/lang/IllegalArgumentException;-><init>()V

    throw p0

    :cond_2
    sget-object p0, Landroidx/lifecycle/f$a;->ON_RESUME:Landroidx/lifecycle/f$a;

    return-object p0

    :cond_3
    sget-object p0, Landroidx/lifecycle/f$a;->ON_START:Landroidx/lifecycle/f$a;

    return-object p0

    :cond_4
    :goto_0
    sget-object p0, Landroidx/lifecycle/f$a;->ON_CREATE:Landroidx/lifecycle/f$a;

    return-object p0
.end method


# virtual methods
.method public a()Landroidx/lifecycle/f$b;
    .locals 1

    iget-object v0, p0, Landroidx/lifecycle/j;->b:Landroidx/lifecycle/f$b;

    return-object v0
.end method

.method public a(Landroidx/lifecycle/f$b;)V
    .locals 0

    invoke-direct {p0, p1}, Landroidx/lifecycle/j;->c(Landroidx/lifecycle/f$b;)V

    return-void
.end method

.method public a(Landroidx/lifecycle/g;)V
    .locals 6

    iget-object v0, p0, Landroidx/lifecycle/j;->b:Landroidx/lifecycle/f$b;

    sget-object v1, Landroidx/lifecycle/f$b;->a:Landroidx/lifecycle/f$b;

    if-ne v0, v1, :cond_0

    goto :goto_0

    :cond_0
    sget-object v1, Landroidx/lifecycle/f$b;->b:Landroidx/lifecycle/f$b;

    :goto_0
    new-instance v0, Landroidx/lifecycle/j$a;

    invoke-direct {v0, p1, v1}, Landroidx/lifecycle/j$a;-><init>(Landroidx/lifecycle/g;Landroidx/lifecycle/f$b;)V

    iget-object v1, p0, Landroidx/lifecycle/j;->a:La/b/a/b/a;

    invoke-virtual {v1, p1, v0}, La/b/a/b/a;->b(Ljava/lang/Object;Ljava/lang/Object;)Ljava/lang/Object;

    move-result-object v1

    check-cast v1, Landroidx/lifecycle/j$a;

    if-eqz v1, :cond_1

    return-void

    :cond_1
    iget-object v1, p0, Landroidx/lifecycle/j;->c:Ljava/lang/ref/WeakReference;

    invoke-virtual {v1}, Ljava/lang/ref/WeakReference;->get()Ljava/lang/Object;

    move-result-object v1

    check-cast v1, Landroidx/lifecycle/h;

    if-nez v1, :cond_2

    return-void

    :cond_2
    iget v2, p0, Landroidx/lifecycle/j;->d:I

    const/4 v3, 0x1

    if-nez v2, :cond_4

    iget-boolean v2, p0, Landroidx/lifecycle/j;->e:Z

    if-eqz v2, :cond_3

    goto :goto_1

    :cond_3
    const/4 v2, 0x0

    goto :goto_2

    :cond_4
    :goto_1
    move v2, v3

    :goto_2
    invoke-direct {p0, p1}, Landroidx/lifecycle/j;->c(Landroidx/lifecycle/g;)Landroidx/lifecycle/f$b;

    move-result-object v4

    iget v5, p0, Landroidx/lifecycle/j;->d:I

    add-int/2addr v5, v3

    iput v5, p0, Landroidx/lifecycle/j;->d:I

    :goto_3
    iget-object v5, v0, Landroidx/lifecycle/j$a;->a:Landroidx/lifecycle/f$b;

    invoke-virtual {v5, v4}, Ljava/lang/Enum;->compareTo(Ljava/lang/Enum;)I

    move-result v4

    if-gez v4, :cond_5

    iget-object v4, p0, Landroidx/lifecycle/j;->a:La/b/a/b/a;

    invoke-virtual {v4, p1}, La/b/a/b/a;->contains(Ljava/lang/Object;)Z

    move-result v4

    if-eqz v4, :cond_5

    iget-object v4, v0, Landroidx/lifecycle/j$a;->a:Landroidx/lifecycle/f$b;

    invoke-direct {p0, v4}, Landroidx/lifecycle/j;->d(Landroidx/lifecycle/f$b;)V

    iget-object v4, v0, Landroidx/lifecycle/j$a;->a:Landroidx/lifecycle/f$b;

    invoke-static {v4}, Landroidx/lifecycle/j;->e(Landroidx/lifecycle/f$b;)Landroidx/lifecycle/f$a;

    move-result-object v4

    invoke-virtual {v0, v1, v4}, Landroidx/lifecycle/j$a;->a(Landroidx/lifecycle/h;Landroidx/lifecycle/f$a;)V

    invoke-direct {p0}, Landroidx/lifecycle/j;->c()V

    invoke-direct {p0, p1}, Landroidx/lifecycle/j;->c(Landroidx/lifecycle/g;)Landroidx/lifecycle/f$b;

    move-result-object v4

    goto :goto_3

    :cond_5
    if-nez v2, :cond_6

    invoke-direct {p0}, Landroidx/lifecycle/j;->d()V

    :cond_6
    iget p1, p0, Landroidx/lifecycle/j;->d:I

    sub-int/2addr p1, v3

    iput p1, p0, Landroidx/lifecycle/j;->d:I

    return-void
.end method

.method public b(Landroidx/lifecycle/f$a;)V
    .locals 0

    invoke-static {p1}, Landroidx/lifecycle/j;->a(Landroidx/lifecycle/f$a;)Landroidx/lifecycle/f$b;

    move-result-object p1

    invoke-direct {p0, p1}, Landroidx/lifecycle/j;->c(Landroidx/lifecycle/f$b;)V

    return-void
.end method

.method public b(Landroidx/lifecycle/g;)V
    .locals 1

    iget-object v0, p0, Landroidx/lifecycle/j;->a:La/b/a/b/a;

    invoke-virtual {v0, p1}, La/b/a/b/a;->remove(Ljava/lang/Object;)Ljava/lang/Object;

    return-void
.end method
