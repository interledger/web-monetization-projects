.class final La/j/a/t;
.super La/j/a/m;
.source ""

# interfaces
.implements Landroid/view/LayoutInflater$Factory2;


# annotations
.annotation system Ldalvik/annotation/MemberClasses;
    value = {
        La/j/a/t$e;,
        La/j/a/t$d;,
        La/j/a/t$a;,
        La/j/a/t$b;,
        La/j/a/t$c;,
        La/j/a/t$i;,
        La/j/a/t$h;,
        La/j/a/t$g;,
        La/j/a/t$f;
    }
.end annotation


# static fields
.field static a:Z = false

.field static b:Ljava/lang/reflect/Field;

.field static final c:Landroid/view/animation/Interpolator;

.field static final d:Landroid/view/animation/Interpolator;

.field static final e:Landroid/view/animation/Interpolator;

.field static final f:Landroid/view/animation/Interpolator;


# instance fields
.field A:Ljava/lang/String;

.field B:Z

.field C:Ljava/util/ArrayList;
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "Ljava/util/ArrayList<",
            "La/j/a/a;",
            ">;"
        }
    .end annotation
.end field

.field D:Ljava/util/ArrayList;
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "Ljava/util/ArrayList<",
            "Ljava/lang/Boolean;",
            ">;"
        }
    .end annotation
.end field

.field E:Ljava/util/ArrayList;
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "Ljava/util/ArrayList<",
            "La/j/a/g;",
            ">;"
        }
    .end annotation
.end field

.field F:Landroid/os/Bundle;

.field G:Landroid/util/SparseArray;
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "Landroid/util/SparseArray<",
            "Landroid/os/Parcelable;",
            ">;"
        }
    .end annotation
.end field

.field H:Ljava/util/ArrayList;
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "Ljava/util/ArrayList<",
            "La/j/a/t$i;",
            ">;"
        }
    .end annotation
.end field

.field I:La/j/a/u;

.field J:Ljava/lang/Runnable;

.field g:Ljava/util/ArrayList;
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "Ljava/util/ArrayList<",
            "La/j/a/t$h;",
            ">;"
        }
    .end annotation
.end field

.field h:Z

.field i:I

.field final j:Ljava/util/ArrayList;
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "Ljava/util/ArrayList<",
            "La/j/a/g;",
            ">;"
        }
    .end annotation
.end field

.field k:Landroid/util/SparseArray;
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "Landroid/util/SparseArray<",
            "La/j/a/g;",
            ">;"
        }
    .end annotation
.end field

.field l:Ljava/util/ArrayList;
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "Ljava/util/ArrayList<",
            "La/j/a/a;",
            ">;"
        }
    .end annotation
.end field

.field m:Ljava/util/ArrayList;
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "Ljava/util/ArrayList<",
            "La/j/a/g;",
            ">;"
        }
    .end annotation
.end field

.field n:Ljava/util/ArrayList;
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "Ljava/util/ArrayList<",
            "La/j/a/a;",
            ">;"
        }
    .end annotation
.end field

.field o:Ljava/util/ArrayList;
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "Ljava/util/ArrayList<",
            "Ljava/lang/Integer;",
            ">;"
        }
    .end annotation
.end field

.field p:Ljava/util/ArrayList;
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "Ljava/util/ArrayList<",
            "La/j/a/m$c;",
            ">;"
        }
    .end annotation
.end field

.field private final q:Ljava/util/concurrent/CopyOnWriteArrayList;
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "Ljava/util/concurrent/CopyOnWriteArrayList<",
            "La/j/a/t$f;",
            ">;"
        }
    .end annotation
.end field

.field r:I

.field s:La/j/a/l;

.field t:La/j/a/j;

.field u:La/j/a/g;

.field v:La/j/a/g;

.field w:Z

.field x:Z

.field y:Z

.field z:Z


# direct methods
.method static constructor <clinit>()V
    .locals 3

    new-instance v0, Landroid/view/animation/DecelerateInterpolator;

    const/high16 v1, 0x40200000    # 2.5f

    invoke-direct {v0, v1}, Landroid/view/animation/DecelerateInterpolator;-><init>(F)V

    sput-object v0, La/j/a/t;->c:Landroid/view/animation/Interpolator;

    new-instance v0, Landroid/view/animation/DecelerateInterpolator;

    const/high16 v2, 0x3fc00000    # 1.5f

    invoke-direct {v0, v2}, Landroid/view/animation/DecelerateInterpolator;-><init>(F)V

    sput-object v0, La/j/a/t;->d:Landroid/view/animation/Interpolator;

    new-instance v0, Landroid/view/animation/AccelerateInterpolator;

    invoke-direct {v0, v1}, Landroid/view/animation/AccelerateInterpolator;-><init>(F)V

    sput-object v0, La/j/a/t;->e:Landroid/view/animation/Interpolator;

    new-instance v0, Landroid/view/animation/AccelerateInterpolator;

    invoke-direct {v0, v2}, Landroid/view/animation/AccelerateInterpolator;-><init>(F)V

    sput-object v0, La/j/a/t;->f:Landroid/view/animation/Interpolator;

    return-void
.end method

.method constructor <init>()V
    .locals 2

    invoke-direct {p0}, La/j/a/m;-><init>()V

    const/4 v0, 0x0

    iput v0, p0, La/j/a/t;->i:I

    new-instance v1, Ljava/util/ArrayList;

    invoke-direct {v1}, Ljava/util/ArrayList;-><init>()V

    iput-object v1, p0, La/j/a/t;->j:Ljava/util/ArrayList;

    new-instance v1, Ljava/util/concurrent/CopyOnWriteArrayList;

    invoke-direct {v1}, Ljava/util/concurrent/CopyOnWriteArrayList;-><init>()V

    iput-object v1, p0, La/j/a/t;->q:Ljava/util/concurrent/CopyOnWriteArrayList;

    iput v0, p0, La/j/a/t;->r:I

    const/4 v0, 0x0

    iput-object v0, p0, La/j/a/t;->F:Landroid/os/Bundle;

    iput-object v0, p0, La/j/a/t;->G:Landroid/util/SparseArray;

    new-instance v0, La/j/a/n;

    invoke-direct {v0, p0}, La/j/a/n;-><init>(La/j/a/t;)V

    iput-object v0, p0, La/j/a/t;->J:Ljava/lang/Runnable;

    return-void
.end method

.method private A()V
    .locals 9

    iget-object v0, p0, La/j/a/t;->k:Landroid/util/SparseArray;

    const/4 v1, 0x0

    if-nez v0, :cond_0

    move v0, v1

    goto :goto_0

    :cond_0
    invoke-virtual {v0}, Landroid/util/SparseArray;->size()I

    move-result v0

    :goto_0
    if-ge v1, v0, :cond_4

    iget-object v2, p0, La/j/a/t;->k:Landroid/util/SparseArray;

    invoke-virtual {v2, v1}, Landroid/util/SparseArray;->valueAt(I)Ljava/lang/Object;

    move-result-object v2

    move-object v4, v2

    check-cast v4, La/j/a/g;

    if-eqz v4, :cond_3

    invoke-virtual {v4}, La/j/a/g;->g()Landroid/view/View;

    move-result-object v2

    if-eqz v2, :cond_2

    invoke-virtual {v4}, La/j/a/g;->x()I

    move-result v5

    invoke-virtual {v4}, La/j/a/g;->g()Landroid/view/View;

    move-result-object v2

    invoke-virtual {v2}, Landroid/view/View;->getAnimation()Landroid/view/animation/Animation;

    move-result-object v3

    if-eqz v3, :cond_1

    invoke-virtual {v3}, Landroid/view/animation/Animation;->cancel()V

    invoke-virtual {v2}, Landroid/view/View;->clearAnimation()V

    :cond_1
    const/4 v2, 0x0

    invoke-virtual {v4, v2}, La/j/a/g;->a(Landroid/view/View;)V

    const/4 v6, 0x0

    const/4 v7, 0x0

    const/4 v8, 0x0

    move-object v3, p0

    invoke-virtual/range {v3 .. v8}, La/j/a/t;->a(La/j/a/g;IIIZ)V

    goto :goto_1

    :cond_2
    invoke-virtual {v4}, La/j/a/g;->h()Landroid/animation/Animator;

    move-result-object v2

    if-eqz v2, :cond_3

    invoke-virtual {v4}, La/j/a/g;->h()Landroid/animation/Animator;

    move-result-object v2

    invoke-virtual {v2}, Landroid/animation/Animator;->end()V

    :cond_3
    :goto_1
    add-int/lit8 v1, v1, 0x1

    goto :goto_0

    :cond_4
    return-void
.end method

.method private B()V
    .locals 2

    iget-object v0, p0, La/j/a/t;->H:Ljava/util/ArrayList;

    if-eqz v0, :cond_0

    :goto_0
    iget-object v0, p0, La/j/a/t;->H:Ljava/util/ArrayList;

    invoke-virtual {v0}, Ljava/util/ArrayList;->isEmpty()Z

    move-result v0

    if-nez v0, :cond_0

    iget-object v0, p0, La/j/a/t;->H:Ljava/util/ArrayList;

    const/4 v1, 0x0

    invoke-virtual {v0, v1}, Ljava/util/ArrayList;->remove(I)Ljava/lang/Object;

    move-result-object v0

    check-cast v0, La/j/a/t$i;

    invoke-virtual {v0}, La/j/a/t$i;->d()V

    goto :goto_0

    :cond_0
    return-void
.end method

.method private a(Ljava/util/ArrayList;Ljava/util/ArrayList;IILa/d/d;)I
    .locals 7
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "(",
            "Ljava/util/ArrayList<",
            "La/j/a/a;",
            ">;",
            "Ljava/util/ArrayList<",
            "Ljava/lang/Boolean;",
            ">;II",
            "La/d/d<",
            "La/j/a/g;",
            ">;)I"
        }
    .end annotation

    add-int/lit8 v0, p4, -0x1

    move v1, p4

    :goto_0
    if-lt v0, p3, :cond_5

    invoke-virtual {p1, v0}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v2

    check-cast v2, La/j/a/a;

    invoke-virtual {p2, v0}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v3

    check-cast v3, Ljava/lang/Boolean;

    invoke-virtual {v3}, Ljava/lang/Boolean;->booleanValue()Z

    move-result v3

    invoke-virtual {v2}, La/j/a/a;->c()Z

    move-result v4

    const/4 v5, 0x0

    if-eqz v4, :cond_0

    add-int/lit8 v4, v0, 0x1

    invoke-virtual {v2, p1, v4, p4}, La/j/a/a;->a(Ljava/util/ArrayList;II)Z

    move-result v4

    if-nez v4, :cond_0

    const/4 v4, 0x1

    goto :goto_1

    :cond_0
    move v4, v5

    :goto_1
    if-eqz v4, :cond_4

    iget-object v4, p0, La/j/a/t;->H:Ljava/util/ArrayList;

    if-nez v4, :cond_1

    new-instance v4, Ljava/util/ArrayList;

    invoke-direct {v4}, Ljava/util/ArrayList;-><init>()V

    iput-object v4, p0, La/j/a/t;->H:Ljava/util/ArrayList;

    :cond_1
    new-instance v4, La/j/a/t$i;

    invoke-direct {v4, v2, v3}, La/j/a/t$i;-><init>(La/j/a/a;Z)V

    iget-object v6, p0, La/j/a/t;->H:Ljava/util/ArrayList;

    invoke-virtual {v6, v4}, Ljava/util/ArrayList;->add(Ljava/lang/Object;)Z

    invoke-virtual {v2, v4}, La/j/a/a;->a(La/j/a/g$c;)V

    if-eqz v3, :cond_2

    invoke-virtual {v2}, La/j/a/a;->a()V

    goto :goto_2

    :cond_2
    invoke-virtual {v2, v5}, La/j/a/a;->a(Z)V

    :goto_2
    add-int/lit8 v1, v1, -0x1

    if-eq v0, v1, :cond_3

    invoke-virtual {p1, v0}, Ljava/util/ArrayList;->remove(I)Ljava/lang/Object;

    invoke-virtual {p1, v1, v2}, Ljava/util/ArrayList;->add(ILjava/lang/Object;)V

    :cond_3
    invoke-direct {p0, p5}, La/j/a/t;->a(La/d/d;)V

    :cond_4
    add-int/lit8 v0, v0, -0x1

    goto :goto_0

    :cond_5
    return v1
.end method

.method static a(Landroid/content/Context;FF)La/j/a/t$c;
    .locals 0

    new-instance p0, Landroid/view/animation/AlphaAnimation;

    invoke-direct {p0, p1, p2}, Landroid/view/animation/AlphaAnimation;-><init>(FF)V

    sget-object p1, La/j/a/t;->d:Landroid/view/animation/Interpolator;

    invoke-virtual {p0, p1}, Landroid/view/animation/AlphaAnimation;->setInterpolator(Landroid/view/animation/Interpolator;)V

    const-wide/16 p1, 0xdc

    invoke-virtual {p0, p1, p2}, Landroid/view/animation/AlphaAnimation;->setDuration(J)V

    new-instance p1, La/j/a/t$c;

    invoke-direct {p1, p0}, La/j/a/t$c;-><init>(Landroid/view/animation/Animation;)V

    return-object p1
.end method

.method static a(Landroid/content/Context;FFFF)La/j/a/t$c;
    .locals 10

    new-instance p0, Landroid/view/animation/AnimationSet;

    const/4 v0, 0x0

    invoke-direct {p0, v0}, Landroid/view/animation/AnimationSet;-><init>(Z)V

    new-instance v0, Landroid/view/animation/ScaleAnimation;

    const/4 v6, 0x1

    const/high16 v7, 0x3f000000    # 0.5f

    const/4 v8, 0x1

    const/high16 v9, 0x3f000000    # 0.5f

    move-object v1, v0

    move v2, p1

    move v3, p2

    move v4, p1

    move v5, p2

    invoke-direct/range {v1 .. v9}, Landroid/view/animation/ScaleAnimation;-><init>(FFFFIFIF)V

    sget-object p1, La/j/a/t;->c:Landroid/view/animation/Interpolator;

    invoke-virtual {v0, p1}, Landroid/view/animation/ScaleAnimation;->setInterpolator(Landroid/view/animation/Interpolator;)V

    const-wide/16 p1, 0xdc

    invoke-virtual {v0, p1, p2}, Landroid/view/animation/ScaleAnimation;->setDuration(J)V

    invoke-virtual {p0, v0}, Landroid/view/animation/AnimationSet;->addAnimation(Landroid/view/animation/Animation;)V

    new-instance v0, Landroid/view/animation/AlphaAnimation;

    invoke-direct {v0, p3, p4}, Landroid/view/animation/AlphaAnimation;-><init>(FF)V

    sget-object p3, La/j/a/t;->d:Landroid/view/animation/Interpolator;

    invoke-virtual {v0, p3}, Landroid/view/animation/AlphaAnimation;->setInterpolator(Landroid/view/animation/Interpolator;)V

    invoke-virtual {v0, p1, p2}, Landroid/view/animation/AlphaAnimation;->setDuration(J)V

    invoke-virtual {p0, v0}, Landroid/view/animation/AnimationSet;->addAnimation(Landroid/view/animation/Animation;)V

    new-instance p1, La/j/a/t$c;

    invoke-direct {p1, p0}, La/j/a/t$c;-><init>(Landroid/view/animation/Animation;)V

    return-object p1
.end method

.method private static a(Landroid/view/animation/Animation;)Landroid/view/animation/Animation$AnimationListener;
    .locals 3

    const-string v0, "FragmentManager"

    :try_start_0
    sget-object v1, La/j/a/t;->b:Ljava/lang/reflect/Field;

    if-nez v1, :cond_0

    const-class v1, Landroid/view/animation/Animation;

    const-string v2, "mListener"

    invoke-virtual {v1, v2}, Ljava/lang/Class;->getDeclaredField(Ljava/lang/String;)Ljava/lang/reflect/Field;

    move-result-object v1

    sput-object v1, La/j/a/t;->b:Ljava/lang/reflect/Field;

    sget-object v1, La/j/a/t;->b:Ljava/lang/reflect/Field;

    const/4 v2, 0x1

    invoke-virtual {v1, v2}, Ljava/lang/reflect/Field;->setAccessible(Z)V

    :cond_0
    sget-object v1, La/j/a/t;->b:Ljava/lang/reflect/Field;

    invoke-virtual {v1, p0}, Ljava/lang/reflect/Field;->get(Ljava/lang/Object;)Ljava/lang/Object;

    move-result-object p0

    check-cast p0, Landroid/view/animation/Animation$AnimationListener;
    :try_end_0
    .catch Ljava/lang/NoSuchFieldException; {:try_start_0 .. :try_end_0} :catch_1
    .catch Ljava/lang/IllegalAccessException; {:try_start_0 .. :try_end_0} :catch_0

    goto :goto_1

    :catch_0
    move-exception p0

    const-string v1, "Cannot access Animation\'s mListener field"

    goto :goto_0

    :catch_1
    move-exception p0

    const-string v1, "No field with the name mListener is found in Animation class"

    :goto_0
    invoke-static {v0, v1, p0}, Landroid/util/Log;->e(Ljava/lang/String;Ljava/lang/String;Ljava/lang/Throwable;)I

    const/4 p0, 0x0

    :goto_1
    return-object p0
.end method

.method private a(La/d/d;)V
    .locals 10
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "(",
            "La/d/d<",
            "La/j/a/g;",
            ">;)V"
        }
    .end annotation

    iget v0, p0, La/j/a/t;->r:I

    const/4 v1, 0x1

    if-ge v0, v1, :cond_0

    return-void

    :cond_0
    const/4 v1, 0x3

    invoke-static {v0, v1}, Ljava/lang/Math;->min(II)I

    move-result v0

    iget-object v1, p0, La/j/a/t;->j:Ljava/util/ArrayList;

    invoke-virtual {v1}, Ljava/util/ArrayList;->size()I

    move-result v1

    const/4 v2, 0x0

    move v8, v2

    :goto_0
    if-ge v8, v1, :cond_2

    iget-object v2, p0, La/j/a/t;->j:Ljava/util/ArrayList;

    invoke-virtual {v2, v8}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v2

    move-object v9, v2

    check-cast v9, La/j/a/g;

    iget v2, v9, La/j/a/g;->c:I

    if-ge v2, v0, :cond_1

    invoke-virtual {v9}, La/j/a/g;->p()I

    move-result v5

    invoke-virtual {v9}, La/j/a/g;->q()I

    move-result v6

    const/4 v7, 0x0

    move-object v2, p0

    move-object v3, v9

    move v4, v0

    invoke-virtual/range {v2 .. v7}, La/j/a/t;->a(La/j/a/g;IIIZ)V

    iget-object v2, v9, La/j/a/g;->K:Landroid/view/View;

    if-eqz v2, :cond_1

    iget-boolean v2, v9, La/j/a/g;->C:Z

    if-nez v2, :cond_1

    iget-boolean v2, v9, La/j/a/g;->P:Z

    if-eqz v2, :cond_1

    invoke-virtual {p1, v9}, La/d/d;->add(Ljava/lang/Object;)Z

    :cond_1
    add-int/lit8 v8, v8, 0x1

    goto :goto_0

    :cond_2
    return-void
.end method

.method private a(La/j/a/g;La/j/a/t$c;I)V
    .locals 4

    iget-object v0, p1, La/j/a/g;->K:Landroid/view/View;

    iget-object v1, p1, La/j/a/g;->J:Landroid/view/ViewGroup;

    invoke-virtual {v1, v0}, Landroid/view/ViewGroup;->startViewTransition(Landroid/view/View;)V

    invoke-virtual {p1, p3}, La/j/a/g;->b(I)V

    iget-object p3, p2, La/j/a/t$c;->a:Landroid/view/animation/Animation;

    if-eqz p3, :cond_0

    new-instance v2, La/j/a/t$e;

    invoke-direct {v2, p3, v1, v0}, La/j/a/t$e;-><init>(Landroid/view/animation/Animation;Landroid/view/ViewGroup;Landroid/view/View;)V

    iget-object p3, p1, La/j/a/g;->K:Landroid/view/View;

    invoke-virtual {p1, p3}, La/j/a/g;->a(Landroid/view/View;)V

    invoke-static {v2}, La/j/a/t;->a(Landroid/view/animation/Animation;)Landroid/view/animation/Animation$AnimationListener;

    move-result-object p3

    new-instance v3, La/j/a/p;

    invoke-direct {v3, p0, p3, v1, p1}, La/j/a/p;-><init>(La/j/a/t;Landroid/view/animation/Animation$AnimationListener;Landroid/view/ViewGroup;La/j/a/g;)V

    invoke-virtual {v2, v3}, Landroid/view/animation/Animation;->setAnimationListener(Landroid/view/animation/Animation$AnimationListener;)V

    invoke-static {v0, p2}, La/j/a/t;->b(Landroid/view/View;La/j/a/t$c;)V

    iget-object p1, p1, La/j/a/g;->K:Landroid/view/View;

    invoke-virtual {p1, v2}, Landroid/view/View;->startAnimation(Landroid/view/animation/Animation;)V

    goto :goto_0

    :cond_0
    iget-object p3, p2, La/j/a/t$c;->b:Landroid/animation/Animator;

    invoke-virtual {p1, p3}, La/j/a/g;->a(Landroid/animation/Animator;)V

    new-instance v2, La/j/a/q;

    invoke-direct {v2, p0, v1, v0, p1}, La/j/a/q;-><init>(La/j/a/t;Landroid/view/ViewGroup;Landroid/view/View;La/j/a/g;)V

    invoke-virtual {p3, v2}, Landroid/animation/Animator;->addListener(Landroid/animation/Animator$AnimatorListener;)V

    iget-object v0, p1, La/j/a/g;->K:Landroid/view/View;

    invoke-virtual {p3, v0}, Landroid/animation/Animator;->setTarget(Ljava/lang/Object;)V

    iget-object p1, p1, La/j/a/g;->K:Landroid/view/View;

    invoke-static {p1, p2}, La/j/a/t;->b(Landroid/view/View;La/j/a/t$c;)V

    invoke-virtual {p3}, Landroid/animation/Animator;->start()V

    :goto_0
    return-void
.end method

.method private static a(La/j/a/u;)V
    .locals 3

    if-nez p0, :cond_0

    return-void

    :cond_0
    invoke-virtual {p0}, La/j/a/u;->b()Ljava/util/List;

    move-result-object v0

    if-eqz v0, :cond_1

    invoke-interface {v0}, Ljava/util/List;->iterator()Ljava/util/Iterator;

    move-result-object v0

    :goto_0
    invoke-interface {v0}, Ljava/util/Iterator;->hasNext()Z

    move-result v1

    if-eqz v1, :cond_1

    invoke-interface {v0}, Ljava/util/Iterator;->next()Ljava/lang/Object;

    move-result-object v1

    check-cast v1, La/j/a/g;

    const/4 v2, 0x1

    iput-boolean v2, v1, La/j/a/g;->F:Z

    goto :goto_0

    :cond_1
    invoke-virtual {p0}, La/j/a/u;->a()Ljava/util/List;

    move-result-object p0

    if-eqz p0, :cond_2

    invoke-interface {p0}, Ljava/util/List;->iterator()Ljava/util/Iterator;

    move-result-object p0

    :goto_1
    invoke-interface {p0}, Ljava/util/Iterator;->hasNext()Z

    move-result v0

    if-eqz v0, :cond_2

    invoke-interface {p0}, Ljava/util/Iterator;->next()Ljava/lang/Object;

    move-result-object v0

    check-cast v0, La/j/a/u;

    invoke-static {v0}, La/j/a/t;->a(La/j/a/u;)V

    goto :goto_1

    :cond_2
    return-void
.end method

.method private a(Ljava/lang/RuntimeException;)V
    .locals 7

    invoke-virtual {p1}, Ljava/lang/RuntimeException;->getMessage()Ljava/lang/String;

    move-result-object v0

    const-string v1, "FragmentManager"

    invoke-static {v1, v0}, Landroid/util/Log;->e(Ljava/lang/String;Ljava/lang/String;)I

    const-string v0, "Activity state:"

    invoke-static {v1, v0}, Landroid/util/Log;->e(Ljava/lang/String;Ljava/lang/String;)I

    new-instance v0, La/g/h/b;

    invoke-direct {v0, v1}, La/g/h/b;-><init>(Ljava/lang/String;)V

    new-instance v2, Ljava/io/PrintWriter;

    invoke-direct {v2, v0}, Ljava/io/PrintWriter;-><init>(Ljava/io/Writer;)V

    iget-object v0, p0, La/j/a/t;->s:La/j/a/l;

    const-string v3, "Failed dumping state"

    const/4 v4, 0x0

    const/4 v5, 0x0

    const-string v6, "  "

    if-eqz v0, :cond_0

    :try_start_0
    new-array v4, v4, [Ljava/lang/String;

    invoke-virtual {v0, v6, v5, v2, v4}, La/j/a/l;->a(Ljava/lang/String;Ljava/io/FileDescriptor;Ljava/io/PrintWriter;[Ljava/lang/String;)V

    goto :goto_0

    :cond_0
    new-array v0, v4, [Ljava/lang/String;

    invoke-virtual {p0, v6, v5, v2, v0}, La/j/a/t;->a(Ljava/lang/String;Ljava/io/FileDescriptor;Ljava/io/PrintWriter;[Ljava/lang/String;)V
    :try_end_0
    .catch Ljava/lang/Exception; {:try_start_0 .. :try_end_0} :catch_0

    goto :goto_0

    :catch_0
    move-exception v0

    invoke-static {v1, v3, v0}, Landroid/util/Log;->e(Ljava/lang/String;Ljava/lang/String;Ljava/lang/Throwable;)I

    :goto_0
    throw p1
.end method

.method private a(Ljava/util/ArrayList;Ljava/util/ArrayList;)V
    .locals 7
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "(",
            "Ljava/util/ArrayList<",
            "La/j/a/a;",
            ">;",
            "Ljava/util/ArrayList<",
            "Ljava/lang/Boolean;",
            ">;)V"
        }
    .end annotation

    iget-object v0, p0, La/j/a/t;->H:Ljava/util/ArrayList;

    const/4 v1, 0x0

    if-nez v0, :cond_0

    move v0, v1

    goto :goto_0

    :cond_0
    invoke-virtual {v0}, Ljava/util/ArrayList;->size()I

    move-result v0

    :goto_0
    move v2, v0

    move v0, v1

    :goto_1
    if-ge v0, v2, :cond_5

    iget-object v3, p0, La/j/a/t;->H:Ljava/util/ArrayList;

    invoke-virtual {v3, v0}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v3

    check-cast v3, La/j/a/t$i;

    const/4 v4, -0x1

    if-eqz p1, :cond_1

    iget-boolean v5, v3, La/j/a/t$i;->a:Z

    if-nez v5, :cond_1

    iget-object v5, v3, La/j/a/t$i;->b:La/j/a/a;

    invoke-virtual {p1, v5}, Ljava/util/ArrayList;->indexOf(Ljava/lang/Object;)I

    move-result v5

    if-eq v5, v4, :cond_1

    invoke-virtual {p2, v5}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v5

    check-cast v5, Ljava/lang/Boolean;

    invoke-virtual {v5}, Ljava/lang/Boolean;->booleanValue()Z

    move-result v5

    if-eqz v5, :cond_1

    :goto_2
    invoke-virtual {v3}, La/j/a/t$i;->c()V

    goto :goto_3

    :cond_1
    invoke-virtual {v3}, La/j/a/t$i;->e()Z

    move-result v5

    if-nez v5, :cond_2

    if-eqz p1, :cond_4

    iget-object v5, v3, La/j/a/t$i;->b:La/j/a/a;

    invoke-virtual {p1}, Ljava/util/ArrayList;->size()I

    move-result v6

    invoke-virtual {v5, p1, v1, v6}, La/j/a/a;->a(Ljava/util/ArrayList;II)Z

    move-result v5

    if-eqz v5, :cond_4

    :cond_2
    iget-object v5, p0, La/j/a/t;->H:Ljava/util/ArrayList;

    invoke-virtual {v5, v0}, Ljava/util/ArrayList;->remove(I)Ljava/lang/Object;

    add-int/lit8 v0, v0, -0x1

    add-int/lit8 v2, v2, -0x1

    if-eqz p1, :cond_3

    iget-boolean v5, v3, La/j/a/t$i;->a:Z

    if-nez v5, :cond_3

    iget-object v5, v3, La/j/a/t$i;->b:La/j/a/a;

    invoke-virtual {p1, v5}, Ljava/util/ArrayList;->indexOf(Ljava/lang/Object;)I

    move-result v5

    if-eq v5, v4, :cond_3

    invoke-virtual {p2, v5}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v4

    check-cast v4, Ljava/lang/Boolean;

    invoke-virtual {v4}, Ljava/lang/Boolean;->booleanValue()Z

    move-result v4

    if-eqz v4, :cond_3

    goto :goto_2

    :cond_3
    invoke-virtual {v3}, La/j/a/t$i;->d()V

    :cond_4
    :goto_3
    add-int/lit8 v0, v0, 0x1

    goto :goto_1

    :cond_5
    return-void
.end method

.method private static a(Ljava/util/ArrayList;Ljava/util/ArrayList;II)V
    .locals 3
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "(",
            "Ljava/util/ArrayList<",
            "La/j/a/a;",
            ">;",
            "Ljava/util/ArrayList<",
            "Ljava/lang/Boolean;",
            ">;II)V"
        }
    .end annotation

    :goto_0
    if-ge p2, p3, :cond_2

    invoke-virtual {p0, p2}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v0

    check-cast v0, La/j/a/a;

    invoke-virtual {p1, p2}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v1

    check-cast v1, Ljava/lang/Boolean;

    invoke-virtual {v1}, Ljava/lang/Boolean;->booleanValue()Z

    move-result v1

    const/4 v2, 0x1

    if-eqz v1, :cond_1

    const/4 v1, -0x1

    invoke-virtual {v0, v1}, La/j/a/a;->a(I)V

    add-int/lit8 v1, p3, -0x1

    if-ne p2, v1, :cond_0

    goto :goto_1

    :cond_0
    const/4 v2, 0x0

    :goto_1
    invoke-virtual {v0, v2}, La/j/a/a;->a(Z)V

    goto :goto_2

    :cond_1
    invoke-virtual {v0, v2}, La/j/a/a;->a(I)V

    invoke-virtual {v0}, La/j/a/a;->a()V

    :goto_2
    add-int/lit8 p2, p2, 0x1

    goto :goto_0

    :cond_2
    return-void
.end method

.method static a(La/j/a/t$c;)Z
    .locals 4

    iget-object v0, p0, La/j/a/t$c;->a:Landroid/view/animation/Animation;

    instance-of v1, v0, Landroid/view/animation/AlphaAnimation;

    const/4 v2, 0x1

    if-eqz v1, :cond_0

    return v2

    :cond_0
    instance-of v1, v0, Landroid/view/animation/AnimationSet;

    if-eqz v1, :cond_3

    check-cast v0, Landroid/view/animation/AnimationSet;

    invoke-virtual {v0}, Landroid/view/animation/AnimationSet;->getAnimations()Ljava/util/List;

    move-result-object p0

    const/4 v0, 0x0

    move v1, v0

    :goto_0
    invoke-interface {p0}, Ljava/util/List;->size()I

    move-result v3

    if-ge v1, v3, :cond_2

    invoke-interface {p0, v1}, Ljava/util/List;->get(I)Ljava/lang/Object;

    move-result-object v3

    instance-of v3, v3, Landroid/view/animation/AlphaAnimation;

    if-eqz v3, :cond_1

    return v2

    :cond_1
    add-int/lit8 v1, v1, 0x1

    goto :goto_0

    :cond_2
    return v0

    :cond_3
    iget-object p0, p0, La/j/a/t$c;->b:Landroid/animation/Animator;

    invoke-static {p0}, La/j/a/t;->a(Landroid/animation/Animator;)Z

    move-result p0

    return p0
.end method

.method static a(Landroid/animation/Animator;)Z
    .locals 5

    const/4 v0, 0x0

    if-nez p0, :cond_0

    return v0

    :cond_0
    instance-of v1, p0, Landroid/animation/ValueAnimator;

    const/4 v2, 0x1

    if-eqz v1, :cond_2

    check-cast p0, Landroid/animation/ValueAnimator;

    invoke-virtual {p0}, Landroid/animation/ValueAnimator;->getValues()[Landroid/animation/PropertyValuesHolder;

    move-result-object p0

    move v1, v0

    :goto_0
    array-length v3, p0

    if-ge v1, v3, :cond_4

    aget-object v3, p0, v1

    invoke-virtual {v3}, Landroid/animation/PropertyValuesHolder;->getPropertyName()Ljava/lang/String;

    move-result-object v3

    const-string v4, "alpha"

    invoke-virtual {v4, v3}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v3

    if-eqz v3, :cond_1

    return v2

    :cond_1
    add-int/lit8 v1, v1, 0x1

    goto :goto_0

    :cond_2
    instance-of v1, p0, Landroid/animation/AnimatorSet;

    if-eqz v1, :cond_4

    check-cast p0, Landroid/animation/AnimatorSet;

    invoke-virtual {p0}, Landroid/animation/AnimatorSet;->getChildAnimations()Ljava/util/ArrayList;

    move-result-object p0

    move v1, v0

    :goto_1
    invoke-interface {p0}, Ljava/util/List;->size()I

    move-result v3

    if-ge v1, v3, :cond_4

    invoke-interface {p0, v1}, Ljava/util/List;->get(I)Ljava/lang/Object;

    move-result-object v3

    check-cast v3, Landroid/animation/Animator;

    invoke-static {v3}, La/j/a/t;->a(Landroid/animation/Animator;)Z

    move-result v3

    if-eqz v3, :cond_3

    return v2

    :cond_3
    add-int/lit8 v1, v1, 0x1

    goto :goto_1

    :cond_4
    return v0
.end method

.method static a(Landroid/view/View;La/j/a/t$c;)Z
    .locals 3

    const/4 v0, 0x0

    if-eqz p0, :cond_1

    if-nez p1, :cond_0

    goto :goto_0

    :cond_0
    sget v1, Landroid/os/Build$VERSION;->SDK_INT:I

    const/16 v2, 0x13

    if-lt v1, v2, :cond_1

    invoke-virtual {p0}, Landroid/view/View;->getLayerType()I

    move-result v1

    if-nez v1, :cond_1

    invoke-static {p0}, La/g/i/s;->t(Landroid/view/View;)Z

    move-result p0

    if-eqz p0, :cond_1

    invoke-static {p1}, La/j/a/t;->a(La/j/a/t$c;)Z

    move-result p0

    if-eqz p0, :cond_1

    const/4 v0, 0x1

    :cond_1
    :goto_0
    return v0
.end method

.method private a(Ljava/lang/String;II)Z
    .locals 8

    invoke-virtual {p0}, La/j/a/t;->n()Z

    const/4 v0, 0x1

    invoke-direct {p0, v0}, La/j/a/t;->c(Z)V

    iget-object v1, p0, La/j/a/t;->v:La/j/a/g;

    if-eqz v1, :cond_0

    if-gez p2, :cond_0

    if-nez p1, :cond_0

    invoke-virtual {v1}, La/j/a/g;->O()La/j/a/m;

    move-result-object v1

    if-eqz v1, :cond_0

    invoke-virtual {v1}, La/j/a/m;->c()Z

    move-result v1

    if-eqz v1, :cond_0

    return v0

    :cond_0
    iget-object v3, p0, La/j/a/t;->C:Ljava/util/ArrayList;

    iget-object v4, p0, La/j/a/t;->D:Ljava/util/ArrayList;

    move-object v2, p0

    move-object v5, p1

    move v6, p2

    move v7, p3

    invoke-virtual/range {v2 .. v7}, La/j/a/t;->a(Ljava/util/ArrayList;Ljava/util/ArrayList;Ljava/lang/String;II)Z

    move-result p1

    if-eqz p1, :cond_1

    iput-boolean v0, p0, La/j/a/t;->h:Z

    :try_start_0
    iget-object p2, p0, La/j/a/t;->C:Ljava/util/ArrayList;

    iget-object p3, p0, La/j/a/t;->D:Ljava/util/ArrayList;

    invoke-direct {p0, p2, p3}, La/j/a/t;->c(Ljava/util/ArrayList;Ljava/util/ArrayList;)V
    :try_end_0
    .catchall {:try_start_0 .. :try_end_0} :catchall_0

    invoke-direct {p0}, La/j/a/t;->z()V

    goto :goto_0

    :catchall_0
    move-exception p1

    invoke-direct {p0}, La/j/a/t;->z()V

    throw p1

    :cond_1
    :goto_0
    invoke-virtual {p0}, La/j/a/t;->m()V

    invoke-direct {p0}, La/j/a/t;->x()V

    return p1
.end method

.method public static b(IZ)I
    .locals 1

    const/16 v0, 0x1001

    if-eq p0, v0, :cond_4

    const/16 v0, 0x1003

    if-eq p0, v0, :cond_2

    const/16 v0, 0x2002

    if-eq p0, v0, :cond_0

    const/4 p0, -0x1

    goto :goto_0

    :cond_0
    if-eqz p1, :cond_1

    const/4 p0, 0x3

    goto :goto_0

    :cond_1
    const/4 p0, 0x4

    goto :goto_0

    :cond_2
    if-eqz p1, :cond_3

    const/4 p0, 0x5

    goto :goto_0

    :cond_3
    const/4 p0, 0x6

    goto :goto_0

    :cond_4
    if-eqz p1, :cond_5

    const/4 p0, 0x1

    goto :goto_0

    :cond_5
    const/4 p0, 0x2

    :goto_0
    return p0
.end method

.method private b(La/d/d;)V
    .locals 5
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "(",
            "La/d/d<",
            "La/j/a/g;",
            ">;)V"
        }
    .end annotation

    invoke-virtual {p1}, La/d/d;->size()I

    move-result v0

    const/4 v1, 0x0

    :goto_0
    if-ge v1, v0, :cond_1

    invoke-virtual {p1, v1}, La/d/d;->c(I)Ljava/lang/Object;

    move-result-object v2

    check-cast v2, La/j/a/g;

    iget-boolean v3, v2, La/j/a/g;->m:Z

    if-nez v3, :cond_0

    invoke-virtual {v2}, La/j/a/g;->y()Landroid/view/View;

    move-result-object v3

    invoke-virtual {v3}, Landroid/view/View;->getAlpha()F

    move-result v4

    iput v4, v2, La/j/a/g;->R:F

    const/4 v2, 0x0

    invoke-virtual {v3, v2}, Landroid/view/View;->setAlpha(F)V

    :cond_0
    add-int/lit8 v1, v1, 0x1

    goto :goto_0

    :cond_1
    return-void
.end method

.method private static b(Landroid/view/View;La/j/a/t$c;)V
    .locals 3

    if-eqz p0, :cond_2

    if-nez p1, :cond_0

    goto :goto_0

    :cond_0
    invoke-static {p0, p1}, La/j/a/t;->a(Landroid/view/View;La/j/a/t$c;)Z

    move-result v0

    if-eqz v0, :cond_2

    iget-object v0, p1, La/j/a/t$c;->b:Landroid/animation/Animator;

    if-eqz v0, :cond_1

    new-instance p1, La/j/a/t$d;

    invoke-direct {p1, p0}, La/j/a/t$d;-><init>(Landroid/view/View;)V

    invoke-virtual {v0, p1}, Landroid/animation/Animator;->addListener(Landroid/animation/Animator$AnimatorListener;)V

    goto :goto_0

    :cond_1
    iget-object v0, p1, La/j/a/t$c;->a:Landroid/view/animation/Animation;

    invoke-static {v0}, La/j/a/t;->a(Landroid/view/animation/Animation;)Landroid/view/animation/Animation$AnimationListener;

    move-result-object v0

    const/4 v1, 0x2

    const/4 v2, 0x0

    invoke-virtual {p0, v1, v2}, Landroid/view/View;->setLayerType(ILandroid/graphics/Paint;)V

    iget-object p1, p1, La/j/a/t$c;->a:Landroid/view/animation/Animation;

    new-instance v1, La/j/a/t$a;

    invoke-direct {v1, p0, v0}, La/j/a/t$a;-><init>(Landroid/view/View;Landroid/view/animation/Animation$AnimationListener;)V

    invoke-virtual {p1, v1}, Landroid/view/animation/Animation;->setAnimationListener(Landroid/view/animation/Animation$AnimationListener;)V

    :cond_2
    :goto_0
    return-void
.end method

.method private b(Ljava/util/ArrayList;Ljava/util/ArrayList;II)V
    .locals 15
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "(",
            "Ljava/util/ArrayList<",
            "La/j/a/a;",
            ">;",
            "Ljava/util/ArrayList<",
            "Ljava/lang/Boolean;",
            ">;II)V"
        }
    .end annotation

    move-object v6, p0

    move-object/from16 v7, p1

    move-object/from16 v8, p2

    move/from16 v9, p3

    move/from16 v10, p4

    invoke-virtual {v7, v9}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v0

    check-cast v0, La/j/a/a;

    iget-boolean v11, v0, La/j/a/a;->t:Z

    iget-object v0, v6, La/j/a/t;->E:Ljava/util/ArrayList;

    if-nez v0, :cond_0

    new-instance v0, Ljava/util/ArrayList;

    invoke-direct {v0}, Ljava/util/ArrayList;-><init>()V

    iput-object v0, v6, La/j/a/t;->E:Ljava/util/ArrayList;

    goto :goto_0

    :cond_0
    invoke-virtual {v0}, Ljava/util/ArrayList;->clear()V

    :goto_0
    iget-object v0, v6, La/j/a/t;->E:Ljava/util/ArrayList;

    iget-object v1, v6, La/j/a/t;->j:Ljava/util/ArrayList;

    invoke-virtual {v0, v1}, Ljava/util/ArrayList;->addAll(Ljava/util/Collection;)Z

    invoke-virtual {p0}, La/j/a/t;->p()La/j/a/g;

    move-result-object v0

    const/4 v1, 0x0

    move-object v2, v0

    move v12, v1

    move v0, v9

    :goto_1
    const/4 v13, 0x1

    if-ge v0, v10, :cond_4

    invoke-virtual {v7, v0}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v3

    check-cast v3, La/j/a/a;

    invoke-virtual {v8, v0}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v4

    check-cast v4, Ljava/lang/Boolean;

    invoke-virtual {v4}, Ljava/lang/Boolean;->booleanValue()Z

    move-result v4

    if-nez v4, :cond_1

    iget-object v4, v6, La/j/a/t;->E:Ljava/util/ArrayList;

    invoke-virtual {v3, v4, v2}, La/j/a/a;->a(Ljava/util/ArrayList;La/j/a/g;)La/j/a/g;

    move-result-object v2

    goto :goto_2

    :cond_1
    iget-object v4, v6, La/j/a/t;->E:Ljava/util/ArrayList;

    invoke-virtual {v3, v4, v2}, La/j/a/a;->b(Ljava/util/ArrayList;La/j/a/g;)La/j/a/g;

    move-result-object v2

    :goto_2
    if-nez v12, :cond_3

    iget-boolean v3, v3, La/j/a/a;->i:Z

    if-eqz v3, :cond_2

    goto :goto_3

    :cond_2
    move v12, v1

    goto :goto_4

    :cond_3
    :goto_3
    move v12, v13

    :goto_4
    add-int/lit8 v0, v0, 0x1

    goto :goto_1

    :cond_4
    iget-object v0, v6, La/j/a/t;->E:Ljava/util/ArrayList;

    invoke-virtual {v0}, Ljava/util/ArrayList;->clear()V

    if-nez v11, :cond_5

    const/4 v5, 0x0

    move-object v0, p0

    move-object/from16 v1, p1

    move-object/from16 v2, p2

    move/from16 v3, p3

    move/from16 v4, p4

    invoke-static/range {v0 .. v5}, La/j/a/E;->a(La/j/a/t;Ljava/util/ArrayList;Ljava/util/ArrayList;IIZ)V

    :cond_5
    invoke-static/range {p1 .. p4}, La/j/a/t;->a(Ljava/util/ArrayList;Ljava/util/ArrayList;II)V

    if-eqz v11, :cond_6

    new-instance v14, La/d/d;

    invoke-direct {v14}, La/d/d;-><init>()V

    invoke-direct {p0, v14}, La/j/a/t;->a(La/d/d;)V

    move-object v0, p0

    move-object/from16 v1, p1

    move-object/from16 v2, p2

    move/from16 v3, p3

    move/from16 v4, p4

    move-object v5, v14

    invoke-direct/range {v0 .. v5}, La/j/a/t;->a(Ljava/util/ArrayList;Ljava/util/ArrayList;IILa/d/d;)I

    move-result v0

    invoke-direct {p0, v14}, La/j/a/t;->b(La/d/d;)V

    move v4, v0

    goto :goto_5

    :cond_6
    move v4, v10

    :goto_5
    if-eq v4, v9, :cond_7

    if-eqz v11, :cond_7

    const/4 v5, 0x1

    move-object v0, p0

    move-object/from16 v1, p1

    move-object/from16 v2, p2

    move/from16 v3, p3

    invoke-static/range {v0 .. v5}, La/j/a/E;->a(La/j/a/t;Ljava/util/ArrayList;Ljava/util/ArrayList;IIZ)V

    iget v0, v6, La/j/a/t;->r:I

    invoke-virtual {p0, v0, v13}, La/j/a/t;->a(IZ)V

    :cond_7
    :goto_6
    if-ge v9, v10, :cond_9

    invoke-virtual {v7, v9}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v0

    check-cast v0, La/j/a/a;

    invoke-virtual {v8, v9}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v1

    check-cast v1, Ljava/lang/Boolean;

    invoke-virtual {v1}, Ljava/lang/Boolean;->booleanValue()Z

    move-result v1

    if-eqz v1, :cond_8

    iget v1, v0, La/j/a/a;->m:I

    if-ltz v1, :cond_8

    invoke-virtual {p0, v1}, La/j/a/t;->b(I)V

    const/4 v1, -0x1

    iput v1, v0, La/j/a/a;->m:I

    :cond_8
    invoke-virtual {v0}, La/j/a/a;->d()V

    add-int/lit8 v9, v9, 0x1

    goto :goto_6

    :cond_9
    if-eqz v12, :cond_a

    invoke-virtual {p0}, La/j/a/t;->r()V

    :cond_a
    return-void
.end method

.method private b(Ljava/util/ArrayList;Ljava/util/ArrayList;)Z
    .locals 4
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "(",
            "Ljava/util/ArrayList<",
            "La/j/a/a;",
            ">;",
            "Ljava/util/ArrayList<",
            "Ljava/lang/Boolean;",
            ">;)Z"
        }
    .end annotation

    monitor-enter p0

    :try_start_0
    iget-object v0, p0, La/j/a/t;->g:Ljava/util/ArrayList;

    const/4 v1, 0x0

    if-eqz v0, :cond_2

    iget-object v0, p0, La/j/a/t;->g:Ljava/util/ArrayList;

    invoke-virtual {v0}, Ljava/util/ArrayList;->size()I

    move-result v0

    if-nez v0, :cond_0

    goto :goto_1

    :cond_0
    iget-object v0, p0, La/j/a/t;->g:Ljava/util/ArrayList;

    invoke-virtual {v0}, Ljava/util/ArrayList;->size()I

    move-result v0

    move v2, v1

    :goto_0
    if-ge v1, v0, :cond_1

    iget-object v3, p0, La/j/a/t;->g:Ljava/util/ArrayList;

    invoke-virtual {v3, v1}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v3

    check-cast v3, La/j/a/t$h;

    invoke-interface {v3, p1, p2}, La/j/a/t$h;->a(Ljava/util/ArrayList;Ljava/util/ArrayList;)Z

    move-result v3

    or-int/2addr v2, v3

    add-int/lit8 v1, v1, 0x1

    goto :goto_0

    :cond_1
    iget-object p1, p0, La/j/a/t;->g:Ljava/util/ArrayList;

    invoke-virtual {p1}, Ljava/util/ArrayList;->clear()V

    iget-object p1, p0, La/j/a/t;->s:La/j/a/l;

    invoke-virtual {p1}, La/j/a/l;->e()Landroid/os/Handler;

    move-result-object p1

    iget-object p2, p0, La/j/a/t;->J:Ljava/lang/Runnable;

    invoke-virtual {p1, p2}, Landroid/os/Handler;->removeCallbacks(Ljava/lang/Runnable;)V

    monitor-exit p0

    return v2

    :cond_2
    :goto_1
    monitor-exit p0

    return v1

    :catchall_0
    move-exception p1

    monitor-exit p0
    :try_end_0
    .catchall {:try_start_0 .. :try_end_0} :catchall_0

    throw p1
.end method

.method private c(Ljava/util/ArrayList;Ljava/util/ArrayList;)V
    .locals 4
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "(",
            "Ljava/util/ArrayList<",
            "La/j/a/a;",
            ">;",
            "Ljava/util/ArrayList<",
            "Ljava/lang/Boolean;",
            ">;)V"
        }
    .end annotation

    if-eqz p1, :cond_7

    invoke-virtual {p1}, Ljava/util/ArrayList;->isEmpty()Z

    move-result v0

    if-eqz v0, :cond_0

    goto :goto_2

    :cond_0
    if-eqz p2, :cond_6

    invoke-virtual {p1}, Ljava/util/ArrayList;->size()I

    move-result v0

    invoke-virtual {p2}, Ljava/util/ArrayList;->size()I

    move-result v1

    if-ne v0, v1, :cond_6

    invoke-direct {p0, p1, p2}, La/j/a/t;->a(Ljava/util/ArrayList;Ljava/util/ArrayList;)V

    invoke-virtual {p1}, Ljava/util/ArrayList;->size()I

    move-result v0

    const/4 v1, 0x0

    move v2, v1

    :goto_0
    if-ge v1, v0, :cond_4

    invoke-virtual {p1, v1}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v3

    check-cast v3, La/j/a/a;

    iget-boolean v3, v3, La/j/a/a;->t:Z

    if-nez v3, :cond_3

    if-eq v2, v1, :cond_1

    invoke-direct {p0, p1, p2, v2, v1}, La/j/a/t;->b(Ljava/util/ArrayList;Ljava/util/ArrayList;II)V

    :cond_1
    add-int/lit8 v2, v1, 0x1

    invoke-virtual {p2, v1}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v3

    check-cast v3, Ljava/lang/Boolean;

    invoke-virtual {v3}, Ljava/lang/Boolean;->booleanValue()Z

    move-result v3

    if-eqz v3, :cond_2

    :goto_1
    if-ge v2, v0, :cond_2

    invoke-virtual {p2, v2}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v3

    check-cast v3, Ljava/lang/Boolean;

    invoke-virtual {v3}, Ljava/lang/Boolean;->booleanValue()Z

    move-result v3

    if-eqz v3, :cond_2

    invoke-virtual {p1, v2}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v3

    check-cast v3, La/j/a/a;

    iget-boolean v3, v3, La/j/a/a;->t:Z

    if-nez v3, :cond_2

    add-int/lit8 v2, v2, 0x1

    goto :goto_1

    :cond_2
    invoke-direct {p0, p1, p2, v1, v2}, La/j/a/t;->b(Ljava/util/ArrayList;Ljava/util/ArrayList;II)V

    add-int/lit8 v1, v2, -0x1

    :cond_3
    add-int/lit8 v1, v1, 0x1

    goto :goto_0

    :cond_4
    if-eq v2, v0, :cond_5

    invoke-direct {p0, p1, p2, v2, v0}, La/j/a/t;->b(Ljava/util/ArrayList;Ljava/util/ArrayList;II)V

    :cond_5
    return-void

    :cond_6
    new-instance p1, Ljava/lang/IllegalStateException;

    const-string p2, "Internal error with the back stack records"

    invoke-direct {p1, p2}, Ljava/lang/IllegalStateException;-><init>(Ljava/lang/String;)V

    throw p1

    :cond_7
    :goto_2
    return-void
.end method

.method private c(Z)V
    .locals 2

    iget-boolean v0, p0, La/j/a/t;->h:Z

    if-nez v0, :cond_4

    iget-object v0, p0, La/j/a/t;->s:La/j/a/l;

    if-eqz v0, :cond_3

    invoke-static {}, Landroid/os/Looper;->myLooper()Landroid/os/Looper;

    move-result-object v0

    iget-object v1, p0, La/j/a/t;->s:La/j/a/l;

    invoke-virtual {v1}, La/j/a/l;->e()Landroid/os/Handler;

    move-result-object v1

    invoke-virtual {v1}, Landroid/os/Handler;->getLooper()Landroid/os/Looper;

    move-result-object v1

    if-ne v0, v1, :cond_2

    if-nez p1, :cond_0

    invoke-direct {p0}, La/j/a/t;->y()V

    :cond_0
    iget-object p1, p0, La/j/a/t;->C:Ljava/util/ArrayList;

    if-nez p1, :cond_1

    new-instance p1, Ljava/util/ArrayList;

    invoke-direct {p1}, Ljava/util/ArrayList;-><init>()V

    iput-object p1, p0, La/j/a/t;->C:Ljava/util/ArrayList;

    new-instance p1, Ljava/util/ArrayList;

    invoke-direct {p1}, Ljava/util/ArrayList;-><init>()V

    iput-object p1, p0, La/j/a/t;->D:Ljava/util/ArrayList;

    :cond_1
    const/4 p1, 0x1

    iput-boolean p1, p0, La/j/a/t;->h:Z

    const/4 p1, 0x0

    const/4 v0, 0x0

    :try_start_0
    invoke-direct {p0, v0, v0}, La/j/a/t;->a(Ljava/util/ArrayList;Ljava/util/ArrayList;)V
    :try_end_0
    .catchall {:try_start_0 .. :try_end_0} :catchall_0

    iput-boolean p1, p0, La/j/a/t;->h:Z

    return-void

    :catchall_0
    move-exception v0

    iput-boolean p1, p0, La/j/a/t;->h:Z

    throw v0

    :cond_2
    new-instance p1, Ljava/lang/IllegalStateException;

    const-string v0, "Must be called from main thread of fragment host"

    invoke-direct {p1, v0}, Ljava/lang/IllegalStateException;-><init>(Ljava/lang/String;)V

    throw p1

    :cond_3
    new-instance p1, Ljava/lang/IllegalStateException;

    const-string v0, "Fragment host has been destroyed"

    invoke-direct {p1, v0}, Ljava/lang/IllegalStateException;-><init>(Ljava/lang/String;)V

    throw p1

    :cond_4
    new-instance p1, Ljava/lang/IllegalStateException;

    const-string v0, "FragmentManager is already executing transactions"

    invoke-direct {p1, v0}, Ljava/lang/IllegalStateException;-><init>(Ljava/lang/String;)V

    throw p1
.end method

.method public static d(I)I
    .locals 3

    const/16 v0, 0x2002

    const/16 v1, 0x1003

    const/16 v2, 0x1001

    if-eq p0, v2, :cond_2

    if-eq p0, v1, :cond_1

    if-eq p0, v0, :cond_0

    const/4 v0, 0x0

    goto :goto_0

    :cond_0
    move v0, v2

    goto :goto_0

    :cond_1
    move v0, v1

    :cond_2
    :goto_0
    return v0
.end method

.method private e(I)V
    .locals 2

    const/4 v0, 0x1

    const/4 v1, 0x0

    :try_start_0
    iput-boolean v0, p0, La/j/a/t;->h:Z

    invoke-virtual {p0, p1, v1}, La/j/a/t;->a(IZ)V
    :try_end_0
    .catchall {:try_start_0 .. :try_end_0} :catchall_0

    iput-boolean v1, p0, La/j/a/t;->h:Z

    invoke-virtual {p0}, La/j/a/t;->n()Z

    return-void

    :catchall_0
    move-exception p1

    iput-boolean v1, p0, La/j/a/t;->h:Z

    throw p1
.end method

.method private p(La/j/a/g;)La/j/a/g;
    .locals 4

    iget-object v0, p1, La/j/a/g;->J:Landroid/view/ViewGroup;

    iget-object v1, p1, La/j/a/g;->K:Landroid/view/View;

    const/4 v2, 0x0

    if-eqz v0, :cond_2

    if-nez v1, :cond_0

    goto :goto_1

    :cond_0
    iget-object v1, p0, La/j/a/t;->j:Ljava/util/ArrayList;

    invoke-virtual {v1, p1}, Ljava/util/ArrayList;->indexOf(Ljava/lang/Object;)I

    move-result p1

    add-int/lit8 p1, p1, -0x1

    :goto_0
    if-ltz p1, :cond_2

    iget-object v1, p0, La/j/a/t;->j:Ljava/util/ArrayList;

    invoke-virtual {v1, p1}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v1

    check-cast v1, La/j/a/g;

    iget-object v3, v1, La/j/a/g;->J:Landroid/view/ViewGroup;

    if-ne v3, v0, :cond_1

    iget-object v3, v1, La/j/a/g;->K:Landroid/view/View;

    if-eqz v3, :cond_1

    return-object v1

    :cond_1
    add-int/lit8 p1, p1, -0x1

    goto :goto_0

    :cond_2
    :goto_1
    return-object v2
.end method

.method private x()V
    .locals 3

    iget-object v0, p0, La/j/a/t;->k:Landroid/util/SparseArray;

    if-eqz v0, :cond_1

    invoke-virtual {v0}, Landroid/util/SparseArray;->size()I

    move-result v0

    add-int/lit8 v0, v0, -0x1

    :goto_0
    if-ltz v0, :cond_1

    iget-object v1, p0, La/j/a/t;->k:Landroid/util/SparseArray;

    invoke-virtual {v1, v0}, Landroid/util/SparseArray;->valueAt(I)Ljava/lang/Object;

    move-result-object v1

    if-nez v1, :cond_0

    iget-object v1, p0, La/j/a/t;->k:Landroid/util/SparseArray;

    invoke-virtual {v1, v0}, Landroid/util/SparseArray;->keyAt(I)I

    move-result v2

    invoke-virtual {v1, v2}, Landroid/util/SparseArray;->delete(I)V

    :cond_0
    add-int/lit8 v0, v0, -0x1

    goto :goto_0

    :cond_1
    return-void
.end method

.method private y()V
    .locals 3

    invoke-virtual {p0}, La/j/a/t;->b()Z

    move-result v0

    if-nez v0, :cond_1

    iget-object v0, p0, La/j/a/t;->A:Ljava/lang/String;

    if-nez v0, :cond_0

    return-void

    :cond_0
    new-instance v0, Ljava/lang/IllegalStateException;

    new-instance v1, Ljava/lang/StringBuilder;

    invoke-direct {v1}, Ljava/lang/StringBuilder;-><init>()V

    const-string v2, "Can not perform this action inside of "

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    iget-object v2, p0, La/j/a/t;->A:Ljava/lang/String;

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v1}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v1

    invoke-direct {v0, v1}, Ljava/lang/IllegalStateException;-><init>(Ljava/lang/String;)V

    throw v0

    :cond_1
    new-instance v0, Ljava/lang/IllegalStateException;

    const-string v1, "Can not perform this action after onSaveInstanceState"

    invoke-direct {v0, v1}, Ljava/lang/IllegalStateException;-><init>(Ljava/lang/String;)V

    throw v0
.end method

.method private z()V
    .locals 1

    const/4 v0, 0x0

    iput-boolean v0, p0, La/j/a/t;->h:Z

    iget-object v0, p0, La/j/a/t;->D:Ljava/util/ArrayList;

    invoke-virtual {v0}, Ljava/util/ArrayList;->clear()V

    iget-object v0, p0, La/j/a/t;->C:Ljava/util/ArrayList;

    invoke-virtual {v0}, Ljava/util/ArrayList;->clear()V

    return-void
.end method


# virtual methods
.method public a(I)La/j/a/g;
    .locals 3

    iget-object v0, p0, La/j/a/t;->j:Ljava/util/ArrayList;

    invoke-virtual {v0}, Ljava/util/ArrayList;->size()I

    move-result v0

    add-int/lit8 v0, v0, -0x1

    :goto_0
    if-ltz v0, :cond_1

    iget-object v1, p0, La/j/a/t;->j:Ljava/util/ArrayList;

    invoke-virtual {v1, v0}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v1

    check-cast v1, La/j/a/g;

    if-eqz v1, :cond_0

    iget v2, v1, La/j/a/g;->z:I

    if-ne v2, p1, :cond_0

    return-object v1

    :cond_0
    add-int/lit8 v0, v0, -0x1

    goto :goto_0

    :cond_1
    iget-object v0, p0, La/j/a/t;->k:Landroid/util/SparseArray;

    if-eqz v0, :cond_3

    invoke-virtual {v0}, Landroid/util/SparseArray;->size()I

    move-result v0

    add-int/lit8 v0, v0, -0x1

    :goto_1
    if-ltz v0, :cond_3

    iget-object v1, p0, La/j/a/t;->k:Landroid/util/SparseArray;

    invoke-virtual {v1, v0}, Landroid/util/SparseArray;->valueAt(I)Ljava/lang/Object;

    move-result-object v1

    check-cast v1, La/j/a/g;

    if-eqz v1, :cond_2

    iget v2, v1, La/j/a/g;->z:I

    if-ne v2, p1, :cond_2

    return-object v1

    :cond_2
    add-int/lit8 v0, v0, -0x1

    goto :goto_1

    :cond_3
    const/4 p1, 0x0

    return-object p1
.end method

.method public a(Landroid/os/Bundle;Ljava/lang/String;)La/j/a/g;
    .locals 4

    const/4 v0, -0x1

    invoke-virtual {p1, p2, v0}, Landroid/os/Bundle;->getInt(Ljava/lang/String;I)I

    move-result p1

    const/4 v1, 0x0

    if-ne p1, v0, :cond_0

    return-object v1

    :cond_0
    iget-object v0, p0, La/j/a/t;->k:Landroid/util/SparseArray;

    invoke-virtual {v0, p1}, Landroid/util/SparseArray;->get(I)Ljava/lang/Object;

    move-result-object v0

    check-cast v0, La/j/a/g;

    if-eqz v0, :cond_1

    return-object v0

    :cond_1
    new-instance v0, Ljava/lang/IllegalStateException;

    new-instance v2, Ljava/lang/StringBuilder;

    invoke-direct {v2}, Ljava/lang/StringBuilder;-><init>()V

    const-string v3, "Fragment no longer exists for key "

    invoke-virtual {v2, v3}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v2, p2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    const-string p2, ": index "

    invoke-virtual {v2, p2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v2, p1}, Ljava/lang/StringBuilder;->append(I)Ljava/lang/StringBuilder;

    invoke-virtual {v2}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object p1

    invoke-direct {v0, p1}, Ljava/lang/IllegalStateException;-><init>(Ljava/lang/String;)V

    invoke-direct {p0, v0}, La/j/a/t;->a(Ljava/lang/RuntimeException;)V

    throw v1
.end method

.method public a(Ljava/lang/String;)La/j/a/g;
    .locals 3

    if-eqz p1, :cond_1

    iget-object v0, p0, La/j/a/t;->j:Ljava/util/ArrayList;

    invoke-virtual {v0}, Ljava/util/ArrayList;->size()I

    move-result v0

    add-int/lit8 v0, v0, -0x1

    :goto_0
    if-ltz v0, :cond_1

    iget-object v1, p0, La/j/a/t;->j:Ljava/util/ArrayList;

    invoke-virtual {v1, v0}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v1

    check-cast v1, La/j/a/g;

    if-eqz v1, :cond_0

    iget-object v2, v1, La/j/a/g;->B:Ljava/lang/String;

    invoke-virtual {p1, v2}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v2

    if-eqz v2, :cond_0

    return-object v1

    :cond_0
    add-int/lit8 v0, v0, -0x1

    goto :goto_0

    :cond_1
    iget-object v0, p0, La/j/a/t;->k:Landroid/util/SparseArray;

    if-eqz v0, :cond_3

    if-eqz p1, :cond_3

    invoke-virtual {v0}, Landroid/util/SparseArray;->size()I

    move-result v0

    add-int/lit8 v0, v0, -0x1

    :goto_1
    if-ltz v0, :cond_3

    iget-object v1, p0, La/j/a/t;->k:Landroid/util/SparseArray;

    invoke-virtual {v1, v0}, Landroid/util/SparseArray;->valueAt(I)Ljava/lang/Object;

    move-result-object v1

    check-cast v1, La/j/a/g;

    if-eqz v1, :cond_2

    iget-object v2, v1, La/j/a/g;->B:Ljava/lang/String;

    invoke-virtual {p1, v2}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v2

    if-eqz v2, :cond_2

    return-object v1

    :cond_2
    add-int/lit8 v0, v0, -0x1

    goto :goto_1

    :cond_3
    const/4 p1, 0x0

    return-object p1
.end method

.method a(La/j/a/g;IZI)La/j/a/t$c;
    .locals 4

    invoke-virtual {p1}, La/j/a/g;->p()I

    move-result v0

    invoke-virtual {p1, p2, p3, v0}, La/j/a/g;->a(IZI)Landroid/view/animation/Animation;

    move-result-object v1

    if-eqz v1, :cond_0

    new-instance p1, La/j/a/t$c;

    invoke-direct {p1, v1}, La/j/a/t$c;-><init>(Landroid/view/animation/Animation;)V

    return-object p1

    :cond_0
    invoke-virtual {p1, p2, p3, v0}, La/j/a/g;->b(IZI)Landroid/animation/Animator;

    move-result-object p1

    if-eqz p1, :cond_1

    new-instance p2, La/j/a/t$c;

    invoke-direct {p2, p1}, La/j/a/t$c;-><init>(Landroid/animation/Animator;)V

    return-object p2

    :cond_1
    if-eqz v0, :cond_5

    iget-object p1, p0, La/j/a/t;->s:La/j/a/l;

    invoke-virtual {p1}, La/j/a/l;->c()Landroid/content/Context;

    move-result-object p1

    invoke-virtual {p1}, Landroid/content/Context;->getResources()Landroid/content/res/Resources;

    move-result-object p1

    invoke-virtual {p1, v0}, Landroid/content/res/Resources;->getResourceTypeName(I)Ljava/lang/String;

    move-result-object p1

    const-string v1, "anim"

    invoke-virtual {v1, p1}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result p1

    const/4 v1, 0x0

    if-eqz p1, :cond_3

    :try_start_0
    iget-object v2, p0, La/j/a/t;->s:La/j/a/l;

    invoke-virtual {v2}, La/j/a/l;->c()Landroid/content/Context;

    move-result-object v2

    invoke-static {v2, v0}, Landroid/view/animation/AnimationUtils;->loadAnimation(Landroid/content/Context;I)Landroid/view/animation/Animation;

    move-result-object v2

    if-eqz v2, :cond_2

    new-instance v3, La/j/a/t$c;

    invoke-direct {v3, v2}, La/j/a/t$c;-><init>(Landroid/view/animation/Animation;)V
    :try_end_0
    .catch Landroid/content/res/Resources$NotFoundException; {:try_start_0 .. :try_end_0} :catch_0
    .catch Ljava/lang/RuntimeException; {:try_start_0 .. :try_end_0} :catch_1

    return-object v3

    :cond_2
    const/4 v1, 0x1

    goto :goto_0

    :catch_0
    move-exception p1

    throw p1

    :catch_1
    :cond_3
    :goto_0
    if-nez v1, :cond_5

    :try_start_1
    iget-object v1, p0, La/j/a/t;->s:La/j/a/l;

    invoke-virtual {v1}, La/j/a/l;->c()Landroid/content/Context;

    move-result-object v1

    invoke-static {v1, v0}, Landroid/animation/AnimatorInflater;->loadAnimator(Landroid/content/Context;I)Landroid/animation/Animator;

    move-result-object v1

    if-eqz v1, :cond_5

    new-instance v2, La/j/a/t$c;

    invoke-direct {v2, v1}, La/j/a/t$c;-><init>(Landroid/animation/Animator;)V
    :try_end_1
    .catch Ljava/lang/RuntimeException; {:try_start_1 .. :try_end_1} :catch_2

    return-object v2

    :catch_2
    move-exception v1

    if-nez p1, :cond_4

    iget-object p1, p0, La/j/a/t;->s:La/j/a/l;

    invoke-virtual {p1}, La/j/a/l;->c()Landroid/content/Context;

    move-result-object p1

    invoke-static {p1, v0}, Landroid/view/animation/AnimationUtils;->loadAnimation(Landroid/content/Context;I)Landroid/view/animation/Animation;

    move-result-object p1

    if-eqz p1, :cond_5

    new-instance p2, La/j/a/t$c;

    invoke-direct {p2, p1}, La/j/a/t$c;-><init>(Landroid/view/animation/Animation;)V

    return-object p2

    :cond_4
    throw v1

    :cond_5
    const/4 p1, 0x0

    if-nez p2, :cond_6

    return-object p1

    :cond_6
    invoke-static {p2, p3}, La/j/a/t;->b(IZ)I

    move-result p2

    if-gez p2, :cond_7

    return-object p1

    :cond_7
    const p3, 0x3f79999a    # 0.975f

    const/4 v0, 0x0

    const/high16 v1, 0x3f800000    # 1.0f

    packed-switch p2, :pswitch_data_0

    if-nez p4, :cond_8

    iget-object p2, p0, La/j/a/t;->s:La/j/a/l;

    invoke-virtual {p2}, La/j/a/l;->h()Z

    move-result p2

    if-eqz p2, :cond_8

    iget-object p2, p0, La/j/a/t;->s:La/j/a/l;

    invoke-virtual {p2}, La/j/a/l;->g()I

    move-result p4

    goto :goto_1

    :pswitch_0
    iget-object p1, p0, La/j/a/t;->s:La/j/a/l;

    invoke-virtual {p1}, La/j/a/l;->c()Landroid/content/Context;

    move-result-object p1

    invoke-static {p1, v1, v0}, La/j/a/t;->a(Landroid/content/Context;FF)La/j/a/t$c;

    move-result-object p1

    return-object p1

    :pswitch_1
    iget-object p1, p0, La/j/a/t;->s:La/j/a/l;

    invoke-virtual {p1}, La/j/a/l;->c()Landroid/content/Context;

    move-result-object p1

    invoke-static {p1, v0, v1}, La/j/a/t;->a(Landroid/content/Context;FF)La/j/a/t$c;

    move-result-object p1

    return-object p1

    :pswitch_2
    iget-object p1, p0, La/j/a/t;->s:La/j/a/l;

    invoke-virtual {p1}, La/j/a/l;->c()Landroid/content/Context;

    move-result-object p1

    const p2, 0x3f89999a    # 1.075f

    invoke-static {p1, v1, p2, v1, v0}, La/j/a/t;->a(Landroid/content/Context;FFFF)La/j/a/t$c;

    move-result-object p1

    return-object p1

    :pswitch_3
    iget-object p1, p0, La/j/a/t;->s:La/j/a/l;

    invoke-virtual {p1}, La/j/a/l;->c()Landroid/content/Context;

    move-result-object p1

    invoke-static {p1, p3, v1, v0, v1}, La/j/a/t;->a(Landroid/content/Context;FFFF)La/j/a/t$c;

    move-result-object p1

    return-object p1

    :pswitch_4
    iget-object p1, p0, La/j/a/t;->s:La/j/a/l;

    invoke-virtual {p1}, La/j/a/l;->c()Landroid/content/Context;

    move-result-object p1

    invoke-static {p1, v1, p3, v1, v0}, La/j/a/t;->a(Landroid/content/Context;FFFF)La/j/a/t$c;

    move-result-object p1

    return-object p1

    :pswitch_5
    iget-object p1, p0, La/j/a/t;->s:La/j/a/l;

    invoke-virtual {p1}, La/j/a/l;->c()Landroid/content/Context;

    move-result-object p1

    const/high16 p2, 0x3f900000    # 1.125f

    invoke-static {p1, p2, v1, v0, v1}, La/j/a/t;->a(Landroid/content/Context;FFFF)La/j/a/t$c;

    move-result-object p1

    return-object p1

    :cond_8
    :goto_1
    if-nez p4, :cond_9

    :cond_9
    return-object p1

    :pswitch_data_0
    .packed-switch 0x1
        :pswitch_5
        :pswitch_4
        :pswitch_3
        :pswitch_2
        :pswitch_1
        :pswitch_0
    .end packed-switch
.end method

.method public a()Ljava/util/List;
    .locals 2
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "()",
            "Ljava/util/List<",
            "La/j/a/g;",
            ">;"
        }
    .end annotation

    iget-object v0, p0, La/j/a/t;->j:Ljava/util/ArrayList;

    invoke-virtual {v0}, Ljava/util/ArrayList;->isEmpty()Z

    move-result v0

    if-eqz v0, :cond_0

    invoke-static {}, Ljava/util/Collections;->emptyList()Ljava/util/List;

    move-result-object v0

    return-object v0

    :cond_0
    iget-object v0, p0, La/j/a/t;->j:Ljava/util/ArrayList;

    monitor-enter v0

    :try_start_0
    iget-object v1, p0, La/j/a/t;->j:Ljava/util/ArrayList;

    invoke-virtual {v1}, Ljava/util/ArrayList;->clone()Ljava/lang/Object;

    move-result-object v1

    check-cast v1, Ljava/util/List;

    monitor-exit v0

    return-object v1

    :catchall_0
    move-exception v1

    monitor-exit v0
    :try_end_0
    .catchall {:try_start_0 .. :try_end_0} :catchall_0

    throw v1
.end method

.method public a(ILa/j/a/a;)V
    .locals 4

    monitor-enter p0

    :try_start_0
    iget-object v0, p0, La/j/a/t;->n:Ljava/util/ArrayList;

    if-nez v0, :cond_0

    new-instance v0, Ljava/util/ArrayList;

    invoke-direct {v0}, Ljava/util/ArrayList;-><init>()V

    iput-object v0, p0, La/j/a/t;->n:Ljava/util/ArrayList;

    :cond_0
    iget-object v0, p0, La/j/a/t;->n:Ljava/util/ArrayList;

    invoke-virtual {v0}, Ljava/util/ArrayList;->size()I

    move-result v0

    if-ge p1, v0, :cond_2

    sget-boolean v0, La/j/a/t;->a:Z

    if-eqz v0, :cond_1

    const-string v0, "FragmentManager"

    new-instance v1, Ljava/lang/StringBuilder;

    invoke-direct {v1}, Ljava/lang/StringBuilder;-><init>()V

    const-string v2, "Setting back stack index "

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v1, p1}, Ljava/lang/StringBuilder;->append(I)Ljava/lang/StringBuilder;

    const-string v2, " to "

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v1, p2}, Ljava/lang/StringBuilder;->append(Ljava/lang/Object;)Ljava/lang/StringBuilder;

    invoke-virtual {v1}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v1

    invoke-static {v0, v1}, Landroid/util/Log;->v(Ljava/lang/String;Ljava/lang/String;)I

    :cond_1
    iget-object v0, p0, La/j/a/t;->n:Ljava/util/ArrayList;

    invoke-virtual {v0, p1, p2}, Ljava/util/ArrayList;->set(ILjava/lang/Object;)Ljava/lang/Object;

    goto :goto_1

    :cond_2
    :goto_0
    if-ge v0, p1, :cond_5

    iget-object v1, p0, La/j/a/t;->n:Ljava/util/ArrayList;

    const/4 v2, 0x0

    invoke-virtual {v1, v2}, Ljava/util/ArrayList;->add(Ljava/lang/Object;)Z

    iget-object v1, p0, La/j/a/t;->o:Ljava/util/ArrayList;

    if-nez v1, :cond_3

    new-instance v1, Ljava/util/ArrayList;

    invoke-direct {v1}, Ljava/util/ArrayList;-><init>()V

    iput-object v1, p0, La/j/a/t;->o:Ljava/util/ArrayList;

    :cond_3
    sget-boolean v1, La/j/a/t;->a:Z

    if-eqz v1, :cond_4

    const-string v1, "FragmentManager"

    new-instance v2, Ljava/lang/StringBuilder;

    invoke-direct {v2}, Ljava/lang/StringBuilder;-><init>()V

    const-string v3, "Adding available back stack index "

    invoke-virtual {v2, v3}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v2, v0}, Ljava/lang/StringBuilder;->append(I)Ljava/lang/StringBuilder;

    invoke-virtual {v2}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v2

    invoke-static {v1, v2}, Landroid/util/Log;->v(Ljava/lang/String;Ljava/lang/String;)I

    :cond_4
    iget-object v1, p0, La/j/a/t;->o:Ljava/util/ArrayList;

    invoke-static {v0}, Ljava/lang/Integer;->valueOf(I)Ljava/lang/Integer;

    move-result-object v2

    invoke-virtual {v1, v2}, Ljava/util/ArrayList;->add(Ljava/lang/Object;)Z

    add-int/lit8 v0, v0, 0x1

    goto :goto_0

    :cond_5
    sget-boolean v0, La/j/a/t;->a:Z

    if-eqz v0, :cond_6

    const-string v0, "FragmentManager"

    new-instance v1, Ljava/lang/StringBuilder;

    invoke-direct {v1}, Ljava/lang/StringBuilder;-><init>()V

    const-string v2, "Adding back stack index "

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v1, p1}, Ljava/lang/StringBuilder;->append(I)Ljava/lang/StringBuilder;

    const-string p1, " with "

    invoke-virtual {v1, p1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v1, p2}, Ljava/lang/StringBuilder;->append(Ljava/lang/Object;)Ljava/lang/StringBuilder;

    invoke-virtual {v1}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object p1

    invoke-static {v0, p1}, Landroid/util/Log;->v(Ljava/lang/String;Ljava/lang/String;)I

    :cond_6
    iget-object p1, p0, La/j/a/t;->n:Ljava/util/ArrayList;

    invoke-virtual {p1, p2}, Ljava/util/ArrayList;->add(Ljava/lang/Object;)Z

    :goto_1
    monitor-exit p0

    return-void

    :catchall_0
    move-exception p1

    monitor-exit p0
    :try_end_0
    .catchall {:try_start_0 .. :try_end_0} :catchall_0

    throw p1
.end method

.method a(IZ)V
    .locals 3

    iget-object v0, p0, La/j/a/t;->s:La/j/a/l;

    if-nez v0, :cond_1

    if-nez p1, :cond_0

    goto :goto_0

    :cond_0
    new-instance p1, Ljava/lang/IllegalStateException;

    const-string p2, "No activity"

    invoke-direct {p1, p2}, Ljava/lang/IllegalStateException;-><init>(Ljava/lang/String;)V

    throw p1

    :cond_1
    :goto_0
    if-nez p2, :cond_2

    iget p2, p0, La/j/a/t;->r:I

    if-ne p1, p2, :cond_2

    return-void

    :cond_2
    iput p1, p0, La/j/a/t;->r:I

    iget-object p1, p0, La/j/a/t;->k:Landroid/util/SparseArray;

    if-eqz p1, :cond_7

    iget-object p1, p0, La/j/a/t;->j:Ljava/util/ArrayList;

    invoke-virtual {p1}, Ljava/util/ArrayList;->size()I

    move-result p1

    const/4 p2, 0x0

    move v0, p2

    :goto_1
    if-ge v0, p1, :cond_3

    iget-object v1, p0, La/j/a/t;->j:Ljava/util/ArrayList;

    invoke-virtual {v1, v0}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v1

    check-cast v1, La/j/a/g;

    invoke-virtual {p0, v1}, La/j/a/t;->h(La/j/a/g;)V

    add-int/lit8 v0, v0, 0x1

    goto :goto_1

    :cond_3
    iget-object p1, p0, La/j/a/t;->k:Landroid/util/SparseArray;

    invoke-virtual {p1}, Landroid/util/SparseArray;->size()I

    move-result p1

    move v0, p2

    :goto_2
    if-ge v0, p1, :cond_6

    iget-object v1, p0, La/j/a/t;->k:Landroid/util/SparseArray;

    invoke-virtual {v1, v0}, Landroid/util/SparseArray;->valueAt(I)Ljava/lang/Object;

    move-result-object v1

    check-cast v1, La/j/a/g;

    if-eqz v1, :cond_5

    iget-boolean v2, v1, La/j/a/g;->n:Z

    if-nez v2, :cond_4

    iget-boolean v2, v1, La/j/a/g;->D:Z

    if-eqz v2, :cond_5

    :cond_4
    iget-boolean v2, v1, La/j/a/g;->P:Z

    if-nez v2, :cond_5

    invoke-virtual {p0, v1}, La/j/a/t;->h(La/j/a/g;)V

    :cond_5
    add-int/lit8 v0, v0, 0x1

    goto :goto_2

    :cond_6
    invoke-virtual {p0}, La/j/a/t;->w()V

    iget-boolean p1, p0, La/j/a/t;->w:Z

    if-eqz p1, :cond_7

    iget-object p1, p0, La/j/a/t;->s:La/j/a/l;

    if-eqz p1, :cond_7

    iget v0, p0, La/j/a/t;->r:I

    const/4 v1, 0x4

    if-ne v0, v1, :cond_7

    invoke-virtual {p1}, La/j/a/l;->i()V

    iput-boolean p2, p0, La/j/a/t;->w:Z

    :cond_7
    return-void
.end method

.method a(La/j/a/a;)V
    .locals 1

    iget-object v0, p0, La/j/a/t;->l:Ljava/util/ArrayList;

    if-nez v0, :cond_0

    new-instance v0, Ljava/util/ArrayList;

    invoke-direct {v0}, Ljava/util/ArrayList;-><init>()V

    iput-object v0, p0, La/j/a/t;->l:Ljava/util/ArrayList;

    :cond_0
    iget-object v0, p0, La/j/a/t;->l:Ljava/util/ArrayList;

    invoke-virtual {v0, p1}, Ljava/util/ArrayList;->add(Ljava/lang/Object;)Z

    return-void
.end method

.method a(La/j/a/a;ZZZ)V
    .locals 7

    if-eqz p2, :cond_0

    invoke-virtual {p1, p4}, La/j/a/a;->a(Z)V

    goto :goto_0

    :cond_0
    invoke-virtual {p1}, La/j/a/a;->a()V

    :goto_0
    new-instance v1, Ljava/util/ArrayList;

    const/4 v6, 0x1

    invoke-direct {v1, v6}, Ljava/util/ArrayList;-><init>(I)V

    new-instance v2, Ljava/util/ArrayList;

    invoke-direct {v2, v6}, Ljava/util/ArrayList;-><init>(I)V

    invoke-virtual {v1, p1}, Ljava/util/ArrayList;->add(Ljava/lang/Object;)Z

    invoke-static {p2}, Ljava/lang/Boolean;->valueOf(Z)Ljava/lang/Boolean;

    move-result-object p2

    invoke-virtual {v2, p2}, Ljava/util/ArrayList;->add(Ljava/lang/Object;)Z

    if-eqz p3, :cond_1

    const/4 v3, 0x0

    const/4 v4, 0x1

    const/4 v5, 0x1

    move-object v0, p0

    invoke-static/range {v0 .. v5}, La/j/a/E;->a(La/j/a/t;Ljava/util/ArrayList;Ljava/util/ArrayList;IIZ)V

    :cond_1
    if-eqz p4, :cond_2

    iget p2, p0, La/j/a/t;->r:I

    invoke-virtual {p0, p2, v6}, La/j/a/t;->a(IZ)V

    :cond_2
    iget-object p2, p0, La/j/a/t;->k:Landroid/util/SparseArray;

    if-eqz p2, :cond_6

    invoke-virtual {p2}, Landroid/util/SparseArray;->size()I

    move-result p2

    const/4 p3, 0x0

    move v0, p3

    :goto_1
    if-ge v0, p2, :cond_6

    iget-object v1, p0, La/j/a/t;->k:Landroid/util/SparseArray;

    invoke-virtual {v1, v0}, Landroid/util/SparseArray;->valueAt(I)Ljava/lang/Object;

    move-result-object v1

    check-cast v1, La/j/a/g;

    if-eqz v1, :cond_5

    iget-object v2, v1, La/j/a/g;->K:Landroid/view/View;

    if-eqz v2, :cond_5

    iget-boolean v2, v1, La/j/a/g;->P:Z

    if-eqz v2, :cond_5

    iget v2, v1, La/j/a/g;->A:I

    invoke-virtual {p1, v2}, La/j/a/a;->b(I)Z

    move-result v2

    if-eqz v2, :cond_5

    iget v2, v1, La/j/a/g;->R:F

    const/4 v3, 0x0

    cmpl-float v4, v2, v3

    if-lez v4, :cond_3

    iget-object v4, v1, La/j/a/g;->K:Landroid/view/View;

    invoke-virtual {v4, v2}, Landroid/view/View;->setAlpha(F)V

    :cond_3
    if-eqz p4, :cond_4

    iput v3, v1, La/j/a/g;->R:F

    goto :goto_2

    :cond_4
    const/high16 v2, -0x40800000    # -1.0f

    iput v2, v1, La/j/a/g;->R:F

    iput-boolean p3, v1, La/j/a/g;->P:Z

    :cond_5
    :goto_2
    add-int/lit8 v0, v0, 0x1

    goto :goto_1

    :cond_6
    return-void
.end method

.method public a(La/j/a/g;)V
    .locals 3

    sget-boolean v0, La/j/a/t;->a:Z

    if-eqz v0, :cond_0

    new-instance v0, Ljava/lang/StringBuilder;

    invoke-direct {v0}, Ljava/lang/StringBuilder;-><init>()V

    const-string v1, "attach: "

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v0, p1}, Ljava/lang/StringBuilder;->append(Ljava/lang/Object;)Ljava/lang/StringBuilder;

    invoke-virtual {v0}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    const-string v1, "FragmentManager"

    invoke-static {v1, v0}, Landroid/util/Log;->v(Ljava/lang/String;Ljava/lang/String;)I

    :cond_0
    iget-boolean v0, p1, La/j/a/g;->D:Z

    if-eqz v0, :cond_3

    const/4 v0, 0x0

    iput-boolean v0, p1, La/j/a/g;->D:Z

    iget-boolean v0, p1, La/j/a/g;->m:Z

    if-nez v0, :cond_3

    iget-object v0, p0, La/j/a/t;->j:Ljava/util/ArrayList;

    invoke-virtual {v0, p1}, Ljava/util/ArrayList;->contains(Ljava/lang/Object;)Z

    move-result v0

    if-nez v0, :cond_2

    sget-boolean v0, La/j/a/t;->a:Z

    if-eqz v0, :cond_1

    new-instance v0, Ljava/lang/StringBuilder;

    invoke-direct {v0}, Ljava/lang/StringBuilder;-><init>()V

    const-string v1, "add from attach: "

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v0, p1}, Ljava/lang/StringBuilder;->append(Ljava/lang/Object;)Ljava/lang/StringBuilder;

    invoke-virtual {v0}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    const-string v1, "FragmentManager"

    invoke-static {v1, v0}, Landroid/util/Log;->v(Ljava/lang/String;Ljava/lang/String;)I

    :cond_1
    iget-object v0, p0, La/j/a/t;->j:Ljava/util/ArrayList;

    monitor-enter v0

    :try_start_0
    iget-object v1, p0, La/j/a/t;->j:Ljava/util/ArrayList;

    invoke-virtual {v1, p1}, Ljava/util/ArrayList;->add(Ljava/lang/Object;)Z

    monitor-exit v0
    :try_end_0
    .catchall {:try_start_0 .. :try_end_0} :catchall_0

    const/4 v0, 0x1

    iput-boolean v0, p1, La/j/a/g;->m:Z

    iget-boolean v1, p1, La/j/a/g;->G:Z

    if-eqz v1, :cond_3

    iget-boolean p1, p1, La/j/a/g;->H:Z

    if-eqz p1, :cond_3

    iput-boolean v0, p0, La/j/a/t;->w:Z

    goto :goto_0

    :catchall_0
    move-exception p1

    :try_start_1
    monitor-exit v0
    :try_end_1
    .catchall {:try_start_1 .. :try_end_1} :catchall_0

    throw p1

    :cond_2
    new-instance v0, Ljava/lang/IllegalStateException;

    new-instance v1, Ljava/lang/StringBuilder;

    invoke-direct {v1}, Ljava/lang/StringBuilder;-><init>()V

    const-string v2, "Fragment already added: "

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v1, p1}, Ljava/lang/StringBuilder;->append(Ljava/lang/Object;)Ljava/lang/StringBuilder;

    invoke-virtual {v1}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object p1

    invoke-direct {v0, p1}, Ljava/lang/IllegalStateException;-><init>(Ljava/lang/String;)V

    throw v0

    :cond_3
    :goto_0
    return-void
.end method

.method a(La/j/a/g;IIIZ)V
    .locals 16

    move-object/from16 v6, p0

    move-object/from16 v7, p1

    iget-boolean v0, v7, La/j/a/g;->m:Z

    const/4 v8, 0x1

    if-eqz v0, :cond_1

    iget-boolean v0, v7, La/j/a/g;->D:Z

    if-eqz v0, :cond_0

    goto :goto_0

    :cond_0
    move/from16 v0, p2

    goto :goto_1

    :cond_1
    :goto_0
    move/from16 v0, p2

    if-le v0, v8, :cond_2

    move v0, v8

    :cond_2
    :goto_1
    iget-boolean v1, v7, La/j/a/g;->n:Z

    if-eqz v1, :cond_4

    iget v1, v7, La/j/a/g;->c:I

    if-le v0, v1, :cond_4

    if-nez v1, :cond_3

    invoke-virtual/range {p1 .. p1}, La/j/a/g;->C()Z

    move-result v0

    if-eqz v0, :cond_3

    move v0, v8

    goto :goto_2

    :cond_3
    iget v0, v7, La/j/a/g;->c:I

    :cond_4
    :goto_2
    iget-boolean v1, v7, La/j/a/g;->M:Z

    const/4 v9, 0x3

    const/4 v10, 0x2

    if-eqz v1, :cond_5

    iget v1, v7, La/j/a/g;->c:I

    if-ge v1, v9, :cond_5

    if-le v0, v10, :cond_5

    move v11, v10

    goto :goto_3

    :cond_5
    move v11, v0

    :goto_3
    iget v0, v7, La/j/a/g;->c:I

    const-string v12, "FragmentManager"

    const/4 v13, 0x0

    const/4 v14, 0x0

    if-gt v0, v11, :cond_24

    iget-boolean v0, v7, La/j/a/g;->o:Z

    if-eqz v0, :cond_6

    iget-boolean v0, v7, La/j/a/g;->p:Z

    if-nez v0, :cond_6

    return-void

    :cond_6
    invoke-virtual/range {p1 .. p1}, La/j/a/g;->g()Landroid/view/View;

    move-result-object v0

    if-nez v0, :cond_7

    invoke-virtual/range {p1 .. p1}, La/j/a/g;->h()Landroid/animation/Animator;

    move-result-object v0

    if-eqz v0, :cond_8

    :cond_7
    invoke-virtual {v7, v14}, La/j/a/g;->a(Landroid/view/View;)V

    invoke-virtual {v7, v14}, La/j/a/g;->a(Landroid/animation/Animator;)V

    invoke-virtual/range {p1 .. p1}, La/j/a/g;->x()I

    move-result v2

    const/4 v3, 0x0

    const/4 v4, 0x0

    const/4 v5, 0x1

    move-object/from16 v0, p0

    move-object/from16 v1, p1

    invoke-virtual/range {v0 .. v5}, La/j/a/t;->a(La/j/a/g;IIIZ)V

    :cond_8
    iget v0, v7, La/j/a/g;->c:I

    if-eqz v0, :cond_9

    if-eq v0, v8, :cond_14

    if-eq v0, v10, :cond_20

    if-eq v0, v9, :cond_22

    goto/16 :goto_12

    :cond_9
    if-lez v11, :cond_14

    sget-boolean v0, La/j/a/t;->a:Z

    if-eqz v0, :cond_a

    new-instance v0, Ljava/lang/StringBuilder;

    invoke-direct {v0}, Ljava/lang/StringBuilder;-><init>()V

    const-string v1, "moveto CREATED: "

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v0, v7}, Ljava/lang/StringBuilder;->append(Ljava/lang/Object;)Ljava/lang/StringBuilder;

    invoke-virtual {v0}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    invoke-static {v12, v0}, Landroid/util/Log;->v(Ljava/lang/String;Ljava/lang/String;)I

    :cond_a
    iget-object v0, v7, La/j/a/g;->d:Landroid/os/Bundle;

    if-eqz v0, :cond_d

    iget-object v1, v6, La/j/a/t;->s:La/j/a/l;

    invoke-virtual {v1}, La/j/a/l;->c()Landroid/content/Context;

    move-result-object v1

    invoke-virtual {v1}, Landroid/content/Context;->getClassLoader()Ljava/lang/ClassLoader;

    move-result-object v1

    invoke-virtual {v0, v1}, Landroid/os/Bundle;->setClassLoader(Ljava/lang/ClassLoader;)V

    iget-object v0, v7, La/j/a/g;->d:Landroid/os/Bundle;

    const-string v1, "android:view_state"

    invoke-virtual {v0, v1}, Landroid/os/Bundle;->getSparseParcelableArray(Ljava/lang/String;)Landroid/util/SparseArray;

    move-result-object v0

    iput-object v0, v7, La/j/a/g;->e:Landroid/util/SparseArray;

    iget-object v0, v7, La/j/a/g;->d:Landroid/os/Bundle;

    const-string v1, "android:target_state"

    invoke-virtual {v6, v0, v1}, La/j/a/t;->a(Landroid/os/Bundle;Ljava/lang/String;)La/j/a/g;

    move-result-object v0

    iput-object v0, v7, La/j/a/g;->j:La/j/a/g;

    iget-object v0, v7, La/j/a/g;->j:La/j/a/g;

    if-eqz v0, :cond_b

    iget-object v0, v7, La/j/a/g;->d:Landroid/os/Bundle;

    const-string v1, "android:target_req_state"

    invoke-virtual {v0, v1, v13}, Landroid/os/Bundle;->getInt(Ljava/lang/String;I)I

    move-result v0

    iput v0, v7, La/j/a/g;->l:I

    :cond_b
    iget-object v0, v7, La/j/a/g;->f:Ljava/lang/Boolean;

    if-eqz v0, :cond_c

    invoke-virtual {v0}, Ljava/lang/Boolean;->booleanValue()Z

    move-result v0

    iput-boolean v0, v7, La/j/a/g;->N:Z

    iput-object v14, v7, La/j/a/g;->f:Ljava/lang/Boolean;

    goto :goto_4

    :cond_c
    iget-object v0, v7, La/j/a/g;->d:Landroid/os/Bundle;

    const-string v1, "android:user_visible_hint"

    invoke-virtual {v0, v1, v8}, Landroid/os/Bundle;->getBoolean(Ljava/lang/String;Z)Z

    move-result v0

    iput-boolean v0, v7, La/j/a/g;->N:Z

    :goto_4
    iget-boolean v0, v7, La/j/a/g;->N:Z

    if-nez v0, :cond_d

    iput-boolean v8, v7, La/j/a/g;->M:Z

    if-le v11, v10, :cond_d

    move v11, v10

    :cond_d
    iget-object v0, v6, La/j/a/t;->s:La/j/a/l;

    iput-object v0, v7, La/j/a/g;->u:La/j/a/l;

    iget-object v1, v6, La/j/a/t;->u:La/j/a/g;

    iput-object v1, v7, La/j/a/g;->y:La/j/a/g;

    if-eqz v1, :cond_e

    iget-object v0, v1, La/j/a/g;->v:La/j/a/t;

    goto :goto_5

    :cond_e
    invoke-virtual {v0}, La/j/a/l;->d()La/j/a/t;

    move-result-object v0

    :goto_5
    iput-object v0, v7, La/j/a/g;->t:La/j/a/t;

    iget-object v0, v7, La/j/a/g;->j:La/j/a/g;

    const-string v15, "Fragment "

    if-eqz v0, :cond_10

    iget-object v1, v6, La/j/a/t;->k:Landroid/util/SparseArray;

    iget v0, v0, La/j/a/g;->g:I

    invoke-virtual {v1, v0}, Landroid/util/SparseArray;->get(I)Ljava/lang/Object;

    move-result-object v0

    iget-object v1, v7, La/j/a/g;->j:La/j/a/g;

    if-ne v0, v1, :cond_f

    iget v0, v1, La/j/a/g;->c:I

    if-ge v0, v8, :cond_10

    const/4 v2, 0x1

    const/4 v3, 0x0

    const/4 v4, 0x0

    const/4 v5, 0x1

    move-object/from16 v0, p0

    invoke-virtual/range {v0 .. v5}, La/j/a/t;->a(La/j/a/g;IIIZ)V

    goto :goto_6

    :cond_f
    new-instance v0, Ljava/lang/IllegalStateException;

    new-instance v1, Ljava/lang/StringBuilder;

    invoke-direct {v1}, Ljava/lang/StringBuilder;-><init>()V

    invoke-virtual {v1, v15}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v1, v7}, Ljava/lang/StringBuilder;->append(Ljava/lang/Object;)Ljava/lang/StringBuilder;

    const-string v2, " declared target fragment "

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    iget-object v2, v7, La/j/a/g;->j:La/j/a/g;

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/Object;)Ljava/lang/StringBuilder;

    const-string v2, " that does not belong to this FragmentManager!"

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v1}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v1

    invoke-direct {v0, v1}, Ljava/lang/IllegalStateException;-><init>(Ljava/lang/String;)V

    throw v0

    :cond_10
    :goto_6
    iget-object v0, v6, La/j/a/t;->s:La/j/a/l;

    invoke-virtual {v0}, La/j/a/l;->c()Landroid/content/Context;

    move-result-object v0

    invoke-virtual {v6, v7, v0, v13}, La/j/a/t;->b(La/j/a/g;Landroid/content/Context;Z)V

    iput-boolean v13, v7, La/j/a/g;->I:Z

    iget-object v0, v6, La/j/a/t;->s:La/j/a/l;

    invoke-virtual {v0}, La/j/a/l;->c()Landroid/content/Context;

    move-result-object v0

    invoke-virtual {v7, v0}, La/j/a/g;->a(Landroid/content/Context;)V

    iget-boolean v0, v7, La/j/a/g;->I:Z

    if-eqz v0, :cond_13

    iget-object v0, v7, La/j/a/g;->y:La/j/a/g;

    if-nez v0, :cond_11

    iget-object v0, v6, La/j/a/t;->s:La/j/a/l;

    invoke-virtual {v0, v7}, La/j/a/l;->a(La/j/a/g;)V

    goto :goto_7

    :cond_11
    invoke-virtual {v0, v7}, La/j/a/g;->a(La/j/a/g;)V

    :goto_7
    iget-object v0, v6, La/j/a/t;->s:La/j/a/l;

    invoke-virtual {v0}, La/j/a/l;->c()Landroid/content/Context;

    move-result-object v0

    invoke-virtual {v6, v7, v0, v13}, La/j/a/t;->a(La/j/a/g;Landroid/content/Context;Z)V

    iget-boolean v0, v7, La/j/a/g;->T:Z

    if-nez v0, :cond_12

    iget-object v0, v7, La/j/a/g;->d:Landroid/os/Bundle;

    invoke-virtual {v6, v7, v0, v13}, La/j/a/t;->c(La/j/a/g;Landroid/os/Bundle;Z)V

    iget-object v0, v7, La/j/a/g;->d:Landroid/os/Bundle;

    invoke-virtual {v7, v0}, La/j/a/g;->h(Landroid/os/Bundle;)V

    iget-object v0, v7, La/j/a/g;->d:Landroid/os/Bundle;

    invoke-virtual {v6, v7, v0, v13}, La/j/a/t;->b(La/j/a/g;Landroid/os/Bundle;Z)V

    goto :goto_8

    :cond_12
    iget-object v0, v7, La/j/a/g;->d:Landroid/os/Bundle;

    invoke-virtual {v7, v0}, La/j/a/g;->k(Landroid/os/Bundle;)V

    iput v8, v7, La/j/a/g;->c:I

    :goto_8
    iput-boolean v13, v7, La/j/a/g;->F:Z

    goto :goto_9

    :cond_13
    new-instance v0, La/j/a/P;

    new-instance v1, Ljava/lang/StringBuilder;

    invoke-direct {v1}, Ljava/lang/StringBuilder;-><init>()V

    invoke-virtual {v1, v15}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v1, v7}, Ljava/lang/StringBuilder;->append(Ljava/lang/Object;)Ljava/lang/StringBuilder;

    const-string v2, " did not call through to super.onAttach()"

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v1}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v1

    invoke-direct {v0, v1}, La/j/a/P;-><init>(Ljava/lang/String;)V

    throw v0

    :cond_14
    :goto_9
    invoke-virtual/range {p0 .. p1}, La/j/a/t;->d(La/j/a/g;)V

    if-le v11, v8, :cond_20

    sget-boolean v0, La/j/a/t;->a:Z

    if-eqz v0, :cond_15

    new-instance v0, Ljava/lang/StringBuilder;

    invoke-direct {v0}, Ljava/lang/StringBuilder;-><init>()V

    const-string v1, "moveto ACTIVITY_CREATED: "

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v0, v7}, Ljava/lang/StringBuilder;->append(Ljava/lang/Object;)Ljava/lang/StringBuilder;

    invoke-virtual {v0}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    invoke-static {v12, v0}, Landroid/util/Log;->v(Ljava/lang/String;Ljava/lang/String;)I

    :cond_15
    iget-boolean v0, v7, La/j/a/g;->o:Z

    if-nez v0, :cond_1e

    iget v0, v7, La/j/a/g;->A:I

    if-eqz v0, :cond_18

    const/4 v1, -0x1

    if-eq v0, v1, :cond_17

    iget-object v1, v6, La/j/a/t;->t:La/j/a/j;

    invoke-virtual {v1, v0}, La/j/a/j;->a(I)Landroid/view/View;

    move-result-object v0

    check-cast v0, Landroid/view/ViewGroup;

    if-nez v0, :cond_19

    iget-boolean v1, v7, La/j/a/g;->q:Z

    if-eqz v1, :cond_16

    goto :goto_b

    :cond_16
    :try_start_0
    invoke-virtual/range {p1 .. p1}, La/j/a/g;->t()Landroid/content/res/Resources;

    move-result-object v0

    iget v1, v7, La/j/a/g;->A:I

    invoke-virtual {v0, v1}, Landroid/content/res/Resources;->getResourceName(I)Ljava/lang/String;

    move-result-object v0
    :try_end_0
    .catch Landroid/content/res/Resources$NotFoundException; {:try_start_0 .. :try_end_0} :catch_0

    goto :goto_a

    :catch_0
    const-string v0, "unknown"

    :goto_a
    new-instance v1, Ljava/lang/IllegalArgumentException;

    new-instance v2, Ljava/lang/StringBuilder;

    invoke-direct {v2}, Ljava/lang/StringBuilder;-><init>()V

    const-string v3, "No view found for id 0x"

    invoke-virtual {v2, v3}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    iget v3, v7, La/j/a/g;->A:I

    invoke-static {v3}, Ljava/lang/Integer;->toHexString(I)Ljava/lang/String;

    move-result-object v3

    invoke-virtual {v2, v3}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    const-string v3, " ("

    invoke-virtual {v2, v3}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v2, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    const-string v0, ") for fragment "

    invoke-virtual {v2, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v2, v7}, Ljava/lang/StringBuilder;->append(Ljava/lang/Object;)Ljava/lang/StringBuilder;

    invoke-virtual {v2}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    invoke-direct {v1, v0}, Ljava/lang/IllegalArgumentException;-><init>(Ljava/lang/String;)V

    invoke-direct {v6, v1}, La/j/a/t;->a(Ljava/lang/RuntimeException;)V

    throw v14

    :cond_17
    new-instance v0, Ljava/lang/IllegalArgumentException;

    new-instance v1, Ljava/lang/StringBuilder;

    invoke-direct {v1}, Ljava/lang/StringBuilder;-><init>()V

    const-string v2, "Cannot create fragment "

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v1, v7}, Ljava/lang/StringBuilder;->append(Ljava/lang/Object;)Ljava/lang/StringBuilder;

    const-string v2, " for a container view with no id"

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v1}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v1

    invoke-direct {v0, v1}, Ljava/lang/IllegalArgumentException;-><init>(Ljava/lang/String;)V

    invoke-direct {v6, v0}, La/j/a/t;->a(Ljava/lang/RuntimeException;)V

    throw v14

    :cond_18
    move-object v0, v14

    :cond_19
    :goto_b
    iput-object v0, v7, La/j/a/g;->J:Landroid/view/ViewGroup;

    iget-object v1, v7, La/j/a/g;->d:Landroid/os/Bundle;

    invoke-virtual {v7, v1}, La/j/a/g;->i(Landroid/os/Bundle;)Landroid/view/LayoutInflater;

    move-result-object v1

    iget-object v2, v7, La/j/a/g;->d:Landroid/os/Bundle;

    invoke-virtual {v7, v1, v0, v2}, La/j/a/g;->b(Landroid/view/LayoutInflater;Landroid/view/ViewGroup;Landroid/os/Bundle;)V

    iget-object v1, v7, La/j/a/g;->K:Landroid/view/View;

    if-eqz v1, :cond_1d

    iput-object v1, v7, La/j/a/g;->L:Landroid/view/View;

    invoke-virtual {v1, v13}, Landroid/view/View;->setSaveFromParentEnabled(Z)V

    if-eqz v0, :cond_1a

    iget-object v1, v7, La/j/a/g;->K:Landroid/view/View;

    invoke-virtual {v0, v1}, Landroid/view/ViewGroup;->addView(Landroid/view/View;)V

    :cond_1a
    iget-boolean v0, v7, La/j/a/g;->C:Z

    if-eqz v0, :cond_1b

    iget-object v0, v7, La/j/a/g;->K:Landroid/view/View;

    const/16 v1, 0x8

    invoke-virtual {v0, v1}, Landroid/view/View;->setVisibility(I)V

    :cond_1b
    iget-object v0, v7, La/j/a/g;->K:Landroid/view/View;

    iget-object v1, v7, La/j/a/g;->d:Landroid/os/Bundle;

    invoke-virtual {v7, v0, v1}, La/j/a/g;->a(Landroid/view/View;Landroid/os/Bundle;)V

    iget-object v0, v7, La/j/a/g;->K:Landroid/view/View;

    iget-object v1, v7, La/j/a/g;->d:Landroid/os/Bundle;

    invoke-virtual {v6, v7, v0, v1, v13}, La/j/a/t;->a(La/j/a/g;Landroid/view/View;Landroid/os/Bundle;Z)V

    iget-object v0, v7, La/j/a/g;->K:Landroid/view/View;

    invoke-virtual {v0}, Landroid/view/View;->getVisibility()I

    move-result v0

    if-nez v0, :cond_1c

    iget-object v0, v7, La/j/a/g;->J:Landroid/view/ViewGroup;

    if-eqz v0, :cond_1c

    goto :goto_c

    :cond_1c
    move v8, v13

    :goto_c
    iput-boolean v8, v7, La/j/a/g;->P:Z

    goto :goto_d

    :cond_1d
    iput-object v14, v7, La/j/a/g;->L:Landroid/view/View;

    :cond_1e
    :goto_d
    iget-object v0, v7, La/j/a/g;->d:Landroid/os/Bundle;

    invoke-virtual {v7, v0}, La/j/a/g;->g(Landroid/os/Bundle;)V

    iget-object v0, v7, La/j/a/g;->d:Landroid/os/Bundle;

    invoke-virtual {v6, v7, v0, v13}, La/j/a/t;->a(La/j/a/g;Landroid/os/Bundle;Z)V

    iget-object v0, v7, La/j/a/g;->K:Landroid/view/View;

    if-eqz v0, :cond_1f

    iget-object v0, v7, La/j/a/g;->d:Landroid/os/Bundle;

    invoke-virtual {v7, v0}, La/j/a/g;->l(Landroid/os/Bundle;)V

    :cond_1f
    iput-object v14, v7, La/j/a/g;->d:Landroid/os/Bundle;

    :cond_20
    if-le v11, v10, :cond_22

    sget-boolean v0, La/j/a/t;->a:Z

    if-eqz v0, :cond_21

    new-instance v0, Ljava/lang/StringBuilder;

    invoke-direct {v0}, Ljava/lang/StringBuilder;-><init>()V

    const-string v1, "moveto STARTED: "

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v0, v7}, Ljava/lang/StringBuilder;->append(Ljava/lang/Object;)Ljava/lang/StringBuilder;

    invoke-virtual {v0}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    invoke-static {v12, v0}, Landroid/util/Log;->v(Ljava/lang/String;Ljava/lang/String;)I

    :cond_21
    invoke-virtual/range {p1 .. p1}, La/j/a/g;->V()V

    invoke-virtual {v6, v7, v13}, La/j/a/t;->f(La/j/a/g;Z)V

    :cond_22
    if-le v11, v9, :cond_37

    sget-boolean v0, La/j/a/t;->a:Z

    if-eqz v0, :cond_23

    new-instance v0, Ljava/lang/StringBuilder;

    invoke-direct {v0}, Ljava/lang/StringBuilder;-><init>()V

    const-string v1, "moveto RESUMED: "

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v0, v7}, Ljava/lang/StringBuilder;->append(Ljava/lang/Object;)Ljava/lang/StringBuilder;

    invoke-virtual {v0}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    invoke-static {v12, v0}, Landroid/util/Log;->v(Ljava/lang/String;Ljava/lang/String;)I

    :cond_23
    invoke-virtual/range {p1 .. p1}, La/j/a/g;->U()V

    invoke-virtual {v6, v7, v13}, La/j/a/t;->e(La/j/a/g;Z)V

    iput-object v14, v7, La/j/a/g;->d:Landroid/os/Bundle;

    iput-object v14, v7, La/j/a/g;->e:Landroid/util/SparseArray;

    goto/16 :goto_12

    :cond_24
    if-le v0, v11, :cond_37

    if-eq v0, v8, :cond_2f

    if-eq v0, v10, :cond_29

    if-eq v0, v9, :cond_27

    const/4 v1, 0x4

    if-eq v0, v1, :cond_25

    goto/16 :goto_12

    :cond_25
    if-ge v11, v1, :cond_27

    sget-boolean v0, La/j/a/t;->a:Z

    if-eqz v0, :cond_26

    new-instance v0, Ljava/lang/StringBuilder;

    invoke-direct {v0}, Ljava/lang/StringBuilder;-><init>()V

    const-string v1, "movefrom RESUMED: "

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v0, v7}, Ljava/lang/StringBuilder;->append(Ljava/lang/Object;)Ljava/lang/StringBuilder;

    invoke-virtual {v0}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    invoke-static {v12, v0}, Landroid/util/Log;->v(Ljava/lang/String;Ljava/lang/String;)I

    :cond_26
    invoke-virtual/range {p1 .. p1}, La/j/a/g;->T()V

    invoke-virtual {v6, v7, v13}, La/j/a/t;->d(La/j/a/g;Z)V

    :cond_27
    if-ge v11, v9, :cond_29

    sget-boolean v0, La/j/a/t;->a:Z

    if-eqz v0, :cond_28

    new-instance v0, Ljava/lang/StringBuilder;

    invoke-direct {v0}, Ljava/lang/StringBuilder;-><init>()V

    const-string v1, "movefrom STARTED: "

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v0, v7}, Ljava/lang/StringBuilder;->append(Ljava/lang/Object;)Ljava/lang/StringBuilder;

    invoke-virtual {v0}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    invoke-static {v12, v0}, Landroid/util/Log;->v(Ljava/lang/String;Ljava/lang/String;)I

    :cond_28
    invoke-virtual/range {p1 .. p1}, La/j/a/g;->W()V

    invoke-virtual {v6, v7, v13}, La/j/a/t;->g(La/j/a/g;Z)V

    :cond_29
    if-ge v11, v10, :cond_2f

    sget-boolean v0, La/j/a/t;->a:Z

    if-eqz v0, :cond_2a

    new-instance v0, Ljava/lang/StringBuilder;

    invoke-direct {v0}, Ljava/lang/StringBuilder;-><init>()V

    const-string v1, "movefrom ACTIVITY_CREATED: "

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v0, v7}, Ljava/lang/StringBuilder;->append(Ljava/lang/Object;)Ljava/lang/StringBuilder;

    invoke-virtual {v0}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    invoke-static {v12, v0}, Landroid/util/Log;->v(Ljava/lang/String;Ljava/lang/String;)I

    :cond_2a
    iget-object v0, v7, La/j/a/g;->K:Landroid/view/View;

    if-eqz v0, :cond_2b

    iget-object v0, v6, La/j/a/t;->s:La/j/a/l;

    invoke-virtual {v0, v7}, La/j/a/l;->b(La/j/a/g;)Z

    move-result v0

    if-eqz v0, :cond_2b

    iget-object v0, v7, La/j/a/g;->e:Landroid/util/SparseArray;

    if-nez v0, :cond_2b

    invoke-virtual/range {p0 .. p1}, La/j/a/t;->m(La/j/a/g;)V

    :cond_2b
    invoke-virtual/range {p1 .. p1}, La/j/a/g;->Q()V

    invoke-virtual {v6, v7, v13}, La/j/a/t;->h(La/j/a/g;Z)V

    iget-object v0, v7, La/j/a/g;->K:Landroid/view/View;

    if-eqz v0, :cond_2e

    iget-object v1, v7, La/j/a/g;->J:Landroid/view/ViewGroup;

    if-eqz v1, :cond_2e

    invoke-virtual {v1, v0}, Landroid/view/ViewGroup;->endViewTransition(Landroid/view/View;)V

    iget-object v0, v7, La/j/a/g;->K:Landroid/view/View;

    invoke-virtual {v0}, Landroid/view/View;->clearAnimation()V

    iget v0, v6, La/j/a/t;->r:I

    const/4 v1, 0x0

    if-lez v0, :cond_2c

    iget-boolean v0, v6, La/j/a/t;->z:Z

    if-nez v0, :cond_2c

    iget-object v0, v7, La/j/a/g;->K:Landroid/view/View;

    invoke-virtual {v0}, Landroid/view/View;->getVisibility()I

    move-result v0

    if-nez v0, :cond_2c

    iget v0, v7, La/j/a/g;->R:F

    cmpl-float v0, v0, v1

    if-ltz v0, :cond_2c

    move/from16 v0, p3

    move/from16 v2, p4

    invoke-virtual {v6, v7, v0, v13, v2}, La/j/a/t;->a(La/j/a/g;IZI)La/j/a/t$c;

    move-result-object v0

    goto :goto_e

    :cond_2c
    move-object v0, v14

    :goto_e
    iput v1, v7, La/j/a/g;->R:F

    if-eqz v0, :cond_2d

    invoke-direct {v6, v7, v0, v11}, La/j/a/t;->a(La/j/a/g;La/j/a/t$c;I)V

    :cond_2d
    iget-object v0, v7, La/j/a/g;->J:Landroid/view/ViewGroup;

    iget-object v1, v7, La/j/a/g;->K:Landroid/view/View;

    invoke-virtual {v0, v1}, Landroid/view/ViewGroup;->removeView(Landroid/view/View;)V

    :cond_2e
    iput-object v14, v7, La/j/a/g;->J:Landroid/view/ViewGroup;

    iput-object v14, v7, La/j/a/g;->K:Landroid/view/View;

    iput-object v14, v7, La/j/a/g;->W:Landroidx/lifecycle/h;

    iget-object v0, v7, La/j/a/g;->X:Landroidx/lifecycle/o;

    invoke-virtual {v0, v14}, Landroidx/lifecycle/o;->a(Ljava/lang/Object;)V

    iput-object v14, v7, La/j/a/g;->L:Landroid/view/View;

    iput-boolean v13, v7, La/j/a/g;->p:Z

    :cond_2f
    if-ge v11, v8, :cond_37

    iget-boolean v0, v6, La/j/a/t;->z:Z

    if-eqz v0, :cond_31

    invoke-virtual/range {p1 .. p1}, La/j/a/g;->g()Landroid/view/View;

    move-result-object v0

    if-eqz v0, :cond_30

    invoke-virtual/range {p1 .. p1}, La/j/a/g;->g()Landroid/view/View;

    move-result-object v0

    invoke-virtual {v7, v14}, La/j/a/g;->a(Landroid/view/View;)V

    invoke-virtual {v0}, Landroid/view/View;->clearAnimation()V

    goto :goto_f

    :cond_30
    invoke-virtual/range {p1 .. p1}, La/j/a/g;->h()Landroid/animation/Animator;

    move-result-object v0

    if-eqz v0, :cond_31

    invoke-virtual/range {p1 .. p1}, La/j/a/g;->h()Landroid/animation/Animator;

    move-result-object v0

    invoke-virtual {v7, v14}, La/j/a/g;->a(Landroid/animation/Animator;)V

    invoke-virtual {v0}, Landroid/animation/Animator;->cancel()V

    :cond_31
    :goto_f
    invoke-virtual/range {p1 .. p1}, La/j/a/g;->g()Landroid/view/View;

    move-result-object v0

    if-nez v0, :cond_36

    invoke-virtual/range {p1 .. p1}, La/j/a/g;->h()Landroid/animation/Animator;

    move-result-object v0

    if-eqz v0, :cond_32

    goto :goto_11

    :cond_32
    sget-boolean v0, La/j/a/t;->a:Z

    if-eqz v0, :cond_33

    new-instance v0, Ljava/lang/StringBuilder;

    invoke-direct {v0}, Ljava/lang/StringBuilder;-><init>()V

    const-string v1, "movefrom CREATED: "

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v0, v7}, Ljava/lang/StringBuilder;->append(Ljava/lang/Object;)Ljava/lang/StringBuilder;

    invoke-virtual {v0}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    invoke-static {v12, v0}, Landroid/util/Log;->v(Ljava/lang/String;Ljava/lang/String;)I

    :cond_33
    iget-boolean v0, v7, La/j/a/g;->F:Z

    if-nez v0, :cond_34

    invoke-virtual/range {p1 .. p1}, La/j/a/g;->P()V

    invoke-virtual {v6, v7, v13}, La/j/a/t;->b(La/j/a/g;Z)V

    goto :goto_10

    :cond_34
    iput v13, v7, La/j/a/g;->c:I

    :goto_10
    invoke-virtual/range {p1 .. p1}, La/j/a/g;->R()V

    invoke-virtual {v6, v7, v13}, La/j/a/t;->c(La/j/a/g;Z)V

    if-nez p5, :cond_37

    iget-boolean v0, v7, La/j/a/g;->F:Z

    if-nez v0, :cond_35

    invoke-virtual/range {p0 .. p1}, La/j/a/t;->g(La/j/a/g;)V

    goto :goto_12

    :cond_35
    iput-object v14, v7, La/j/a/g;->u:La/j/a/l;

    iput-object v14, v7, La/j/a/g;->y:La/j/a/g;

    iput-object v14, v7, La/j/a/g;->t:La/j/a/t;

    goto :goto_12

    :cond_36
    :goto_11
    invoke-virtual {v7, v11}, La/j/a/g;->b(I)V

    goto :goto_13

    :cond_37
    :goto_12
    move v8, v11

    :goto_13
    iget v0, v7, La/j/a/g;->c:I

    if-eq v0, v8, :cond_38

    new-instance v0, Ljava/lang/StringBuilder;

    invoke-direct {v0}, Ljava/lang/StringBuilder;-><init>()V

    const-string v1, "moveToState: Fragment state for "

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v0, v7}, Ljava/lang/StringBuilder;->append(Ljava/lang/Object;)Ljava/lang/StringBuilder;

    const-string v1, " not updated inline; "

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    const-string v1, "expected state "

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v0, v8}, Ljava/lang/StringBuilder;->append(I)Ljava/lang/StringBuilder;

    const-string v1, " found "

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    iget v1, v7, La/j/a/g;->c:I

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(I)Ljava/lang/StringBuilder;

    invoke-virtual {v0}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    invoke-static {v12, v0}, Landroid/util/Log;->w(Ljava/lang/String;Ljava/lang/String;)I

    iput v8, v7, La/j/a/g;->c:I

    :cond_38
    return-void
.end method

.method a(La/j/a/g;Landroid/content/Context;Z)V
    .locals 3

    iget-object v0, p0, La/j/a/t;->u:La/j/a/g;

    if-eqz v0, :cond_0

    invoke-virtual {v0}, La/j/a/g;->o()La/j/a/m;

    move-result-object v0

    instance-of v1, v0, La/j/a/t;

    if-eqz v1, :cond_0

    check-cast v0, La/j/a/t;

    const/4 v1, 0x1

    invoke-virtual {v0, p1, p2, v1}, La/j/a/t;->a(La/j/a/g;Landroid/content/Context;Z)V

    :cond_0
    iget-object v0, p0, La/j/a/t;->q:Ljava/util/concurrent/CopyOnWriteArrayList;

    invoke-virtual {v0}, Ljava/util/concurrent/CopyOnWriteArrayList;->iterator()Ljava/util/Iterator;

    move-result-object v0

    :cond_1
    :goto_0
    invoke-interface {v0}, Ljava/util/Iterator;->hasNext()Z

    move-result v1

    if-eqz v1, :cond_3

    invoke-interface {v0}, Ljava/util/Iterator;->next()Ljava/lang/Object;

    move-result-object v1

    check-cast v1, La/j/a/t$f;

    if-eqz p3, :cond_2

    iget-boolean v2, v1, La/j/a/t$f;->b:Z

    if-eqz v2, :cond_1

    :cond_2
    iget-object v1, v1, La/j/a/t$f;->a:La/j/a/m$b;

    invoke-virtual {v1, p0, p1, p2}, La/j/a/m$b;->a(La/j/a/m;La/j/a/g;Landroid/content/Context;)V

    goto :goto_0

    :cond_3
    return-void
.end method

.method a(La/j/a/g;Landroid/os/Bundle;Z)V
    .locals 3

    iget-object v0, p0, La/j/a/t;->u:La/j/a/g;

    if-eqz v0, :cond_0

    invoke-virtual {v0}, La/j/a/g;->o()La/j/a/m;

    move-result-object v0

    instance-of v1, v0, La/j/a/t;

    if-eqz v1, :cond_0

    check-cast v0, La/j/a/t;

    const/4 v1, 0x1

    invoke-virtual {v0, p1, p2, v1}, La/j/a/t;->a(La/j/a/g;Landroid/os/Bundle;Z)V

    :cond_0
    iget-object v0, p0, La/j/a/t;->q:Ljava/util/concurrent/CopyOnWriteArrayList;

    invoke-virtual {v0}, Ljava/util/concurrent/CopyOnWriteArrayList;->iterator()Ljava/util/Iterator;

    move-result-object v0

    :cond_1
    :goto_0
    invoke-interface {v0}, Ljava/util/Iterator;->hasNext()Z

    move-result v1

    if-eqz v1, :cond_3

    invoke-interface {v0}, Ljava/util/Iterator;->next()Ljava/lang/Object;

    move-result-object v1

    check-cast v1, La/j/a/t$f;

    if-eqz p3, :cond_2

    iget-boolean v2, v1, La/j/a/t$f;->b:Z

    if-eqz v2, :cond_1

    :cond_2
    iget-object v1, v1, La/j/a/t$f;->a:La/j/a/m$b;

    invoke-virtual {v1, p0, p1, p2}, La/j/a/m$b;->a(La/j/a/m;La/j/a/g;Landroid/os/Bundle;)V

    goto :goto_0

    :cond_3
    return-void
.end method

.method a(La/j/a/g;Landroid/view/View;Landroid/os/Bundle;Z)V
    .locals 3

    iget-object v0, p0, La/j/a/t;->u:La/j/a/g;

    if-eqz v0, :cond_0

    invoke-virtual {v0}, La/j/a/g;->o()La/j/a/m;

    move-result-object v0

    instance-of v1, v0, La/j/a/t;

    if-eqz v1, :cond_0

    check-cast v0, La/j/a/t;

    const/4 v1, 0x1

    invoke-virtual {v0, p1, p2, p3, v1}, La/j/a/t;->a(La/j/a/g;Landroid/view/View;Landroid/os/Bundle;Z)V

    :cond_0
    iget-object v0, p0, La/j/a/t;->q:Ljava/util/concurrent/CopyOnWriteArrayList;

    invoke-virtual {v0}, Ljava/util/concurrent/CopyOnWriteArrayList;->iterator()Ljava/util/Iterator;

    move-result-object v0

    :cond_1
    :goto_0
    invoke-interface {v0}, Ljava/util/Iterator;->hasNext()Z

    move-result v1

    if-eqz v1, :cond_3

    invoke-interface {v0}, Ljava/util/Iterator;->next()Ljava/lang/Object;

    move-result-object v1

    check-cast v1, La/j/a/t$f;

    if-eqz p4, :cond_2

    iget-boolean v2, v1, La/j/a/t$f;->b:Z

    if-eqz v2, :cond_1

    :cond_2
    iget-object v1, v1, La/j/a/t$f;->a:La/j/a/m$b;

    invoke-virtual {v1, p0, p1, p2, p3}, La/j/a/m$b;->a(La/j/a/m;La/j/a/g;Landroid/view/View;Landroid/os/Bundle;)V

    goto :goto_0

    :cond_3
    return-void
.end method

.method public a(La/j/a/g;Z)V
    .locals 3

    sget-boolean v0, La/j/a/t;->a:Z

    if-eqz v0, :cond_0

    new-instance v0, Ljava/lang/StringBuilder;

    invoke-direct {v0}, Ljava/lang/StringBuilder;-><init>()V

    const-string v1, "add: "

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v0, p1}, Ljava/lang/StringBuilder;->append(Ljava/lang/Object;)Ljava/lang/StringBuilder;

    invoke-virtual {v0}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    const-string v1, "FragmentManager"

    invoke-static {v1, v0}, Landroid/util/Log;->v(Ljava/lang/String;Ljava/lang/String;)I

    :cond_0
    invoke-virtual {p0, p1}, La/j/a/t;->f(La/j/a/g;)V

    iget-boolean v0, p1, La/j/a/g;->D:Z

    if-nez v0, :cond_4

    iget-object v0, p0, La/j/a/t;->j:Ljava/util/ArrayList;

    invoke-virtual {v0, p1}, Ljava/util/ArrayList;->contains(Ljava/lang/Object;)Z

    move-result v0

    if-nez v0, :cond_3

    iget-object v0, p0, La/j/a/t;->j:Ljava/util/ArrayList;

    monitor-enter v0

    :try_start_0
    iget-object v1, p0, La/j/a/t;->j:Ljava/util/ArrayList;

    invoke-virtual {v1, p1}, Ljava/util/ArrayList;->add(Ljava/lang/Object;)Z

    monitor-exit v0
    :try_end_0
    .catchall {:try_start_0 .. :try_end_0} :catchall_0

    const/4 v0, 0x1

    iput-boolean v0, p1, La/j/a/g;->m:Z

    const/4 v1, 0x0

    iput-boolean v1, p1, La/j/a/g;->n:Z

    iget-object v2, p1, La/j/a/g;->K:Landroid/view/View;

    if-nez v2, :cond_1

    iput-boolean v1, p1, La/j/a/g;->Q:Z

    :cond_1
    iget-boolean v1, p1, La/j/a/g;->G:Z

    if-eqz v1, :cond_2

    iget-boolean v1, p1, La/j/a/g;->H:Z

    if-eqz v1, :cond_2

    iput-boolean v0, p0, La/j/a/t;->w:Z

    :cond_2
    if-eqz p2, :cond_4

    invoke-virtual {p0, p1}, La/j/a/t;->i(La/j/a/g;)V

    goto :goto_0

    :catchall_0
    move-exception p1

    :try_start_1
    monitor-exit v0
    :try_end_1
    .catchall {:try_start_1 .. :try_end_1} :catchall_0

    throw p1

    :cond_3
    new-instance p2, Ljava/lang/IllegalStateException;

    new-instance v0, Ljava/lang/StringBuilder;

    invoke-direct {v0}, Ljava/lang/StringBuilder;-><init>()V

    const-string v1, "Fragment already added: "

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v0, p1}, Ljava/lang/StringBuilder;->append(Ljava/lang/Object;)Ljava/lang/StringBuilder;

    invoke-virtual {v0}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object p1

    invoke-direct {p2, p1}, Ljava/lang/IllegalStateException;-><init>(Ljava/lang/String;)V

    throw p2

    :cond_4
    :goto_0
    return-void
.end method

.method public a(La/j/a/l;La/j/a/j;La/j/a/g;)V
    .locals 1

    iget-object v0, p0, La/j/a/t;->s:La/j/a/l;

    if-nez v0, :cond_0

    iput-object p1, p0, La/j/a/t;->s:La/j/a/l;

    iput-object p2, p0, La/j/a/t;->t:La/j/a/j;

    iput-object p3, p0, La/j/a/t;->u:La/j/a/g;

    return-void

    :cond_0
    new-instance p1, Ljava/lang/IllegalStateException;

    const-string p2, "Already attached"

    invoke-direct {p1, p2}, Ljava/lang/IllegalStateException;-><init>(Ljava/lang/String;)V

    throw p1
.end method

.method public a(Landroid/content/res/Configuration;)V
    .locals 2

    const/4 v0, 0x0

    :goto_0
    iget-object v1, p0, La/j/a/t;->j:Ljava/util/ArrayList;

    invoke-virtual {v1}, Ljava/util/ArrayList;->size()I

    move-result v1

    if-ge v0, v1, :cond_1

    iget-object v1, p0, La/j/a/t;->j:Ljava/util/ArrayList;

    invoke-virtual {v1, v0}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v1

    check-cast v1, La/j/a/g;

    if-eqz v1, :cond_0

    invoke-virtual {v1, p1}, La/j/a/g;->a(Landroid/content/res/Configuration;)V

    :cond_0
    add-int/lit8 v0, v0, 0x1

    goto :goto_0

    :cond_1
    return-void
.end method

.method public a(Landroid/os/Bundle;Ljava/lang/String;La/j/a/g;)V
    .locals 1

    iget v0, p3, La/j/a/g;->g:I

    if-ltz v0, :cond_0

    invoke-virtual {p1, p2, v0}, Landroid/os/Bundle;->putInt(Ljava/lang/String;I)V

    return-void

    :cond_0
    new-instance p1, Ljava/lang/IllegalStateException;

    new-instance p2, Ljava/lang/StringBuilder;

    invoke-direct {p2}, Ljava/lang/StringBuilder;-><init>()V

    const-string v0, "Fragment "

    invoke-virtual {p2, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {p2, p3}, Ljava/lang/StringBuilder;->append(Ljava/lang/Object;)Ljava/lang/StringBuilder;

    const-string p3, " is not currently in the FragmentManager"

    invoke-virtual {p2, p3}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {p2}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object p2

    invoke-direct {p1, p2}, Ljava/lang/IllegalStateException;-><init>(Ljava/lang/String;)V

    invoke-direct {p0, p1}, La/j/a/t;->a(Ljava/lang/RuntimeException;)V

    const/4 p1, 0x0

    throw p1
.end method

.method a(Landroid/os/Parcelable;La/j/a/u;)V
    .locals 13

    if-nez p1, :cond_0

    return-void

    :cond_0
    check-cast p1, La/j/a/w;

    iget-object v0, p1, La/j/a/w;->a:[La/j/a/y;

    if-nez v0, :cond_1

    return-void

    :cond_1
    const/4 v0, 0x0

    const/4 v1, 0x0

    if-eqz p2, :cond_7

    invoke-virtual {p2}, La/j/a/u;->b()Ljava/util/List;

    move-result-object v2

    invoke-virtual {p2}, La/j/a/u;->a()Ljava/util/List;

    move-result-object v3

    invoke-virtual {p2}, La/j/a/u;->c()Ljava/util/List;

    move-result-object v4

    if-eqz v2, :cond_2

    invoke-interface {v2}, Ljava/util/List;->size()I

    move-result v5

    goto :goto_0

    :cond_2
    move v5, v1

    :goto_0
    move v6, v1

    :goto_1
    if-ge v6, v5, :cond_8

    invoke-interface {v2, v6}, Ljava/util/List;->get(I)Ljava/lang/Object;

    move-result-object v7

    check-cast v7, La/j/a/g;

    sget-boolean v8, La/j/a/t;->a:Z

    if-eqz v8, :cond_3

    new-instance v8, Ljava/lang/StringBuilder;

    invoke-direct {v8}, Ljava/lang/StringBuilder;-><init>()V

    const-string v9, "restoreAllState: re-attaching retained "

    invoke-virtual {v8, v9}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v8, v7}, Ljava/lang/StringBuilder;->append(Ljava/lang/Object;)Ljava/lang/StringBuilder;

    invoke-virtual {v8}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v8

    const-string v9, "FragmentManager"

    invoke-static {v9, v8}, Landroid/util/Log;->v(Ljava/lang/String;Ljava/lang/String;)I

    :cond_3
    move v8, v1

    :goto_2
    iget-object v9, p1, La/j/a/w;->a:[La/j/a/y;

    array-length v10, v9

    if-ge v8, v10, :cond_4

    aget-object v9, v9, v8

    iget v9, v9, La/j/a/y;->b:I

    iget v10, v7, La/j/a/g;->g:I

    if-eq v9, v10, :cond_4

    add-int/lit8 v8, v8, 0x1

    goto :goto_2

    :cond_4
    iget-object v9, p1, La/j/a/w;->a:[La/j/a/y;

    array-length v10, v9

    if-eq v8, v10, :cond_6

    aget-object v8, v9, v8

    iput-object v7, v8, La/j/a/y;->l:La/j/a/g;

    iput-object v0, v7, La/j/a/g;->e:Landroid/util/SparseArray;

    iput v1, v7, La/j/a/g;->s:I

    iput-boolean v1, v7, La/j/a/g;->p:Z

    iput-boolean v1, v7, La/j/a/g;->m:Z

    iput-object v0, v7, La/j/a/g;->j:La/j/a/g;

    iget-object v9, v8, La/j/a/y;->k:Landroid/os/Bundle;

    if-eqz v9, :cond_5

    iget-object v10, p0, La/j/a/t;->s:La/j/a/l;

    invoke-virtual {v10}, La/j/a/l;->c()Landroid/content/Context;

    move-result-object v10

    invoke-virtual {v10}, Landroid/content/Context;->getClassLoader()Ljava/lang/ClassLoader;

    move-result-object v10

    invoke-virtual {v9, v10}, Landroid/os/Bundle;->setClassLoader(Ljava/lang/ClassLoader;)V

    iget-object v9, v8, La/j/a/y;->k:Landroid/os/Bundle;

    const-string v10, "android:view_state"

    invoke-virtual {v9, v10}, Landroid/os/Bundle;->getSparseParcelableArray(Ljava/lang/String;)Landroid/util/SparseArray;

    move-result-object v9

    iput-object v9, v7, La/j/a/g;->e:Landroid/util/SparseArray;

    iget-object v8, v8, La/j/a/y;->k:Landroid/os/Bundle;

    iput-object v8, v7, La/j/a/g;->d:Landroid/os/Bundle;

    :cond_5
    add-int/lit8 v6, v6, 0x1

    goto :goto_1

    :cond_6
    new-instance p1, Ljava/lang/IllegalStateException;

    new-instance p2, Ljava/lang/StringBuilder;

    invoke-direct {p2}, Ljava/lang/StringBuilder;-><init>()V

    const-string v1, "Could not find active fragment with index "

    invoke-virtual {p2, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    iget v1, v7, La/j/a/g;->g:I

    invoke-virtual {p2, v1}, Ljava/lang/StringBuilder;->append(I)Ljava/lang/StringBuilder;

    invoke-virtual {p2}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object p2

    invoke-direct {p1, p2}, Ljava/lang/IllegalStateException;-><init>(Ljava/lang/String;)V

    invoke-direct {p0, p1}, La/j/a/t;->a(Ljava/lang/RuntimeException;)V

    throw v0

    :cond_7
    move-object v3, v0

    move-object v4, v3

    :cond_8
    new-instance v2, Landroid/util/SparseArray;

    iget-object v5, p1, La/j/a/w;->a:[La/j/a/y;

    array-length v5, v5

    invoke-direct {v2, v5}, Landroid/util/SparseArray;-><init>(I)V

    iput-object v2, p0, La/j/a/t;->k:Landroid/util/SparseArray;

    move v2, v1

    :goto_3
    iget-object v5, p1, La/j/a/w;->a:[La/j/a/y;

    array-length v6, v5

    if-ge v2, v6, :cond_d

    aget-object v5, v5, v2

    if-eqz v5, :cond_c

    if-eqz v3, :cond_9

    invoke-interface {v3}, Ljava/util/List;->size()I

    move-result v6

    if-ge v2, v6, :cond_9

    invoke-interface {v3, v2}, Ljava/util/List;->get(I)Ljava/lang/Object;

    move-result-object v6

    check-cast v6, La/j/a/u;

    move-object v11, v6

    goto :goto_4

    :cond_9
    move-object v11, v0

    :goto_4
    if-eqz v4, :cond_a

    invoke-interface {v4}, Ljava/util/List;->size()I

    move-result v6

    if-ge v2, v6, :cond_a

    invoke-interface {v4, v2}, Ljava/util/List;->get(I)Ljava/lang/Object;

    move-result-object v6

    check-cast v6, Landroidx/lifecycle/u;

    move-object v12, v6

    goto :goto_5

    :cond_a
    move-object v12, v0

    :goto_5
    iget-object v8, p0, La/j/a/t;->s:La/j/a/l;

    iget-object v9, p0, La/j/a/t;->t:La/j/a/j;

    iget-object v10, p0, La/j/a/t;->u:La/j/a/g;

    move-object v7, v5

    invoke-virtual/range {v7 .. v12}, La/j/a/y;->a(La/j/a/l;La/j/a/j;La/j/a/g;La/j/a/u;Landroidx/lifecycle/u;)La/j/a/g;

    move-result-object v6

    sget-boolean v7, La/j/a/t;->a:Z

    if-eqz v7, :cond_b

    new-instance v7, Ljava/lang/StringBuilder;

    invoke-direct {v7}, Ljava/lang/StringBuilder;-><init>()V

    const-string v8, "restoreAllState: active #"

    invoke-virtual {v7, v8}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v7, v2}, Ljava/lang/StringBuilder;->append(I)Ljava/lang/StringBuilder;

    const-string v8, ": "

    invoke-virtual {v7, v8}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v7, v6}, Ljava/lang/StringBuilder;->append(Ljava/lang/Object;)Ljava/lang/StringBuilder;

    invoke-virtual {v7}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v7

    const-string v8, "FragmentManager"

    invoke-static {v8, v7}, Landroid/util/Log;->v(Ljava/lang/String;Ljava/lang/String;)I

    :cond_b
    iget-object v7, p0, La/j/a/t;->k:Landroid/util/SparseArray;

    iget v8, v6, La/j/a/g;->g:I

    invoke-virtual {v7, v8, v6}, Landroid/util/SparseArray;->put(ILjava/lang/Object;)V

    iput-object v0, v5, La/j/a/y;->l:La/j/a/g;

    :cond_c
    add-int/lit8 v2, v2, 0x1

    goto :goto_3

    :cond_d
    if-eqz p2, :cond_10

    invoke-virtual {p2}, La/j/a/u;->b()Ljava/util/List;

    move-result-object p2

    if-eqz p2, :cond_e

    invoke-interface {p2}, Ljava/util/List;->size()I

    move-result v2

    goto :goto_6

    :cond_e
    move v2, v1

    :goto_6
    move v3, v1

    :goto_7
    if-ge v3, v2, :cond_10

    invoke-interface {p2, v3}, Ljava/util/List;->get(I)Ljava/lang/Object;

    move-result-object v4

    check-cast v4, La/j/a/g;

    iget v5, v4, La/j/a/g;->k:I

    if-ltz v5, :cond_f

    iget-object v6, p0, La/j/a/t;->k:Landroid/util/SparseArray;

    invoke-virtual {v6, v5}, Landroid/util/SparseArray;->get(I)Ljava/lang/Object;

    move-result-object v5

    check-cast v5, La/j/a/g;

    iput-object v5, v4, La/j/a/g;->j:La/j/a/g;

    iget-object v5, v4, La/j/a/g;->j:La/j/a/g;

    if-nez v5, :cond_f

    new-instance v5, Ljava/lang/StringBuilder;

    invoke-direct {v5}, Ljava/lang/StringBuilder;-><init>()V

    const-string v6, "Re-attaching retained fragment "

    invoke-virtual {v5, v6}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v5, v4}, Ljava/lang/StringBuilder;->append(Ljava/lang/Object;)Ljava/lang/StringBuilder;

    const-string v6, " target no longer exists: "

    invoke-virtual {v5, v6}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    iget v4, v4, La/j/a/g;->k:I

    invoke-virtual {v5, v4}, Ljava/lang/StringBuilder;->append(I)Ljava/lang/StringBuilder;

    invoke-virtual {v5}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v4

    const-string v5, "FragmentManager"

    invoke-static {v5, v4}, Landroid/util/Log;->w(Ljava/lang/String;Ljava/lang/String;)I

    :cond_f
    add-int/lit8 v3, v3, 0x1

    goto :goto_7

    :cond_10
    iget-object p2, p0, La/j/a/t;->j:Ljava/util/ArrayList;

    invoke-virtual {p2}, Ljava/util/ArrayList;->clear()V

    iget-object p2, p1, La/j/a/w;->b:[I

    if-eqz p2, :cond_14

    move p2, v1

    :goto_8
    iget-object v2, p1, La/j/a/w;->b:[I

    array-length v3, v2

    if-ge p2, v3, :cond_14

    iget-object v3, p0, La/j/a/t;->k:Landroid/util/SparseArray;

    aget v2, v2, p2

    invoke-virtual {v3, v2}, Landroid/util/SparseArray;->get(I)Ljava/lang/Object;

    move-result-object v2

    check-cast v2, La/j/a/g;

    if-eqz v2, :cond_13

    const/4 v3, 0x1

    iput-boolean v3, v2, La/j/a/g;->m:Z

    sget-boolean v3, La/j/a/t;->a:Z

    if-eqz v3, :cond_11

    new-instance v3, Ljava/lang/StringBuilder;

    invoke-direct {v3}, Ljava/lang/StringBuilder;-><init>()V

    const-string v4, "restoreAllState: added #"

    invoke-virtual {v3, v4}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v3, p2}, Ljava/lang/StringBuilder;->append(I)Ljava/lang/StringBuilder;

    const-string v4, ": "

    invoke-virtual {v3, v4}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v3, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/Object;)Ljava/lang/StringBuilder;

    invoke-virtual {v3}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v3

    const-string v4, "FragmentManager"

    invoke-static {v4, v3}, Landroid/util/Log;->v(Ljava/lang/String;Ljava/lang/String;)I

    :cond_11
    iget-object v3, p0, La/j/a/t;->j:Ljava/util/ArrayList;

    invoke-virtual {v3, v2}, Ljava/util/ArrayList;->contains(Ljava/lang/Object;)Z

    move-result v3

    if-nez v3, :cond_12

    iget-object v3, p0, La/j/a/t;->j:Ljava/util/ArrayList;

    monitor-enter v3

    :try_start_0
    iget-object v4, p0, La/j/a/t;->j:Ljava/util/ArrayList;

    invoke-virtual {v4, v2}, Ljava/util/ArrayList;->add(Ljava/lang/Object;)Z

    monitor-exit v3

    add-int/lit8 p2, p2, 0x1

    goto :goto_8

    :catchall_0
    move-exception p1

    monitor-exit v3
    :try_end_0
    .catchall {:try_start_0 .. :try_end_0} :catchall_0

    throw p1

    :cond_12
    new-instance p1, Ljava/lang/IllegalStateException;

    const-string p2, "Already added!"

    invoke-direct {p1, p2}, Ljava/lang/IllegalStateException;-><init>(Ljava/lang/String;)V

    throw p1

    :cond_13
    new-instance v1, Ljava/lang/IllegalStateException;

    new-instance v2, Ljava/lang/StringBuilder;

    invoke-direct {v2}, Ljava/lang/StringBuilder;-><init>()V

    const-string v3, "No instantiated fragment for index #"

    invoke-virtual {v2, v3}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    iget-object p1, p1, La/j/a/w;->b:[I

    aget p1, p1, p2

    invoke-virtual {v2, p1}, Ljava/lang/StringBuilder;->append(I)Ljava/lang/StringBuilder;

    invoke-virtual {v2}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object p1

    invoke-direct {v1, p1}, Ljava/lang/IllegalStateException;-><init>(Ljava/lang/String;)V

    invoke-direct {p0, v1}, La/j/a/t;->a(Ljava/lang/RuntimeException;)V

    throw v0

    :cond_14
    iget-object p2, p1, La/j/a/w;->c:[La/j/a/c;

    if-eqz p2, :cond_17

    new-instance v0, Ljava/util/ArrayList;

    array-length p2, p2

    invoke-direct {v0, p2}, Ljava/util/ArrayList;-><init>(I)V

    iput-object v0, p0, La/j/a/t;->l:Ljava/util/ArrayList;

    move p2, v1

    :goto_9
    iget-object v0, p1, La/j/a/w;->c:[La/j/a/c;

    array-length v2, v0

    if-ge p2, v2, :cond_18

    aget-object v0, v0, p2

    invoke-virtual {v0, p0}, La/j/a/c;->a(La/j/a/t;)La/j/a/a;

    move-result-object v0

    sget-boolean v2, La/j/a/t;->a:Z

    if-eqz v2, :cond_15

    new-instance v2, Ljava/lang/StringBuilder;

    invoke-direct {v2}, Ljava/lang/StringBuilder;-><init>()V

    const-string v3, "restoreAllState: back stack #"

    invoke-virtual {v2, v3}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v2, p2}, Ljava/lang/StringBuilder;->append(I)Ljava/lang/StringBuilder;

    const-string v3, " (index "

    invoke-virtual {v2, v3}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    iget v3, v0, La/j/a/a;->m:I

    invoke-virtual {v2, v3}, Ljava/lang/StringBuilder;->append(I)Ljava/lang/StringBuilder;

    const-string v3, "): "

    invoke-virtual {v2, v3}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v2, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/Object;)Ljava/lang/StringBuilder;

    invoke-virtual {v2}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v2

    const-string v3, "FragmentManager"

    invoke-static {v3, v2}, Landroid/util/Log;->v(Ljava/lang/String;Ljava/lang/String;)I

    new-instance v2, La/g/h/b;

    const-string v3, "FragmentManager"

    invoke-direct {v2, v3}, La/g/h/b;-><init>(Ljava/lang/String;)V

    new-instance v3, Ljava/io/PrintWriter;

    invoke-direct {v3, v2}, Ljava/io/PrintWriter;-><init>(Ljava/io/Writer;)V

    const-string v2, "  "

    invoke-virtual {v0, v2, v3, v1}, La/j/a/a;->a(Ljava/lang/String;Ljava/io/PrintWriter;Z)V

    invoke-virtual {v3}, Ljava/io/PrintWriter;->close()V

    :cond_15
    iget-object v2, p0, La/j/a/t;->l:Ljava/util/ArrayList;

    invoke-virtual {v2, v0}, Ljava/util/ArrayList;->add(Ljava/lang/Object;)Z

    iget v2, v0, La/j/a/a;->m:I

    if-ltz v2, :cond_16

    invoke-virtual {p0, v2, v0}, La/j/a/t;->a(ILa/j/a/a;)V

    :cond_16
    add-int/lit8 p2, p2, 0x1

    goto :goto_9

    :cond_17
    iput-object v0, p0, La/j/a/t;->l:Ljava/util/ArrayList;

    :cond_18
    iget p2, p1, La/j/a/w;->d:I

    if-ltz p2, :cond_19

    iget-object v0, p0, La/j/a/t;->k:Landroid/util/SparseArray;

    invoke-virtual {v0, p2}, Landroid/util/SparseArray;->get(I)Ljava/lang/Object;

    move-result-object p2

    check-cast p2, La/j/a/g;

    iput-object p2, p0, La/j/a/t;->v:La/j/a/g;

    :cond_19
    iget p1, p1, La/j/a/w;->e:I

    iput p1, p0, La/j/a/t;->i:I

    return-void
.end method

.method public a(Landroid/view/Menu;)V
    .locals 2

    iget v0, p0, La/j/a/t;->r:I

    const/4 v1, 0x1

    if-ge v0, v1, :cond_0

    return-void

    :cond_0
    const/4 v0, 0x0

    :goto_0
    iget-object v1, p0, La/j/a/t;->j:Ljava/util/ArrayList;

    invoke-virtual {v1}, Ljava/util/ArrayList;->size()I

    move-result v1

    if-ge v0, v1, :cond_2

    iget-object v1, p0, La/j/a/t;->j:Ljava/util/ArrayList;

    invoke-virtual {v1, v0}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v1

    check-cast v1, La/j/a/g;

    if-eqz v1, :cond_1

    invoke-virtual {v1, p1}, La/j/a/g;->c(Landroid/view/Menu;)V

    :cond_1
    add-int/lit8 v0, v0, 0x1

    goto :goto_0

    :cond_2
    return-void
.end method

.method public a(Ljava/lang/String;Ljava/io/FileDescriptor;Ljava/io/PrintWriter;[Ljava/lang/String;)V
    .locals 6

    new-instance v0, Ljava/lang/StringBuilder;

    invoke-direct {v0}, Ljava/lang/StringBuilder;-><init>()V

    invoke-virtual {v0, p1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    const-string v1, "    "

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v0}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    iget-object v1, p0, La/j/a/t;->k:Landroid/util/SparseArray;

    const/4 v2, 0x0

    if-eqz v1, :cond_1

    invoke-virtual {v1}, Landroid/util/SparseArray;->size()I

    move-result v1

    if-lez v1, :cond_1

    invoke-virtual {p3, p1}, Ljava/io/PrintWriter;->print(Ljava/lang/String;)V

    const-string v3, "Active Fragments in "

    invoke-virtual {p3, v3}, Ljava/io/PrintWriter;->print(Ljava/lang/String;)V

    invoke-static {p0}, Ljava/lang/System;->identityHashCode(Ljava/lang/Object;)I

    move-result v3

    invoke-static {v3}, Ljava/lang/Integer;->toHexString(I)Ljava/lang/String;

    move-result-object v3

    invoke-virtual {p3, v3}, Ljava/io/PrintWriter;->print(Ljava/lang/String;)V

    const-string v3, ":"

    invoke-virtual {p3, v3}, Ljava/io/PrintWriter;->println(Ljava/lang/String;)V

    move v3, v2

    :goto_0
    if-ge v3, v1, :cond_1

    iget-object v4, p0, La/j/a/t;->k:Landroid/util/SparseArray;

    invoke-virtual {v4, v3}, Landroid/util/SparseArray;->valueAt(I)Ljava/lang/Object;

    move-result-object v4

    check-cast v4, La/j/a/g;

    invoke-virtual {p3, p1}, Ljava/io/PrintWriter;->print(Ljava/lang/String;)V

    const-string v5, "  #"

    invoke-virtual {p3, v5}, Ljava/io/PrintWriter;->print(Ljava/lang/String;)V

    invoke-virtual {p3, v3}, Ljava/io/PrintWriter;->print(I)V

    const-string v5, ": "

    invoke-virtual {p3, v5}, Ljava/io/PrintWriter;->print(Ljava/lang/String;)V

    invoke-virtual {p3, v4}, Ljava/io/PrintWriter;->println(Ljava/lang/Object;)V

    if-eqz v4, :cond_0

    invoke-virtual {v4, v0, p2, p3, p4}, La/j/a/g;->a(Ljava/lang/String;Ljava/io/FileDescriptor;Ljava/io/PrintWriter;[Ljava/lang/String;)V

    :cond_0
    add-int/lit8 v3, v3, 0x1

    goto :goto_0

    :cond_1
    iget-object v1, p0, La/j/a/t;->j:Ljava/util/ArrayList;

    invoke-virtual {v1}, Ljava/util/ArrayList;->size()I

    move-result v1

    if-lez v1, :cond_2

    invoke-virtual {p3, p1}, Ljava/io/PrintWriter;->print(Ljava/lang/String;)V

    const-string v3, "Added Fragments:"

    invoke-virtual {p3, v3}, Ljava/io/PrintWriter;->println(Ljava/lang/String;)V

    move v3, v2

    :goto_1
    if-ge v3, v1, :cond_2

    iget-object v4, p0, La/j/a/t;->j:Ljava/util/ArrayList;

    invoke-virtual {v4, v3}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v4

    check-cast v4, La/j/a/g;

    invoke-virtual {p3, p1}, Ljava/io/PrintWriter;->print(Ljava/lang/String;)V

    const-string v5, "  #"

    invoke-virtual {p3, v5}, Ljava/io/PrintWriter;->print(Ljava/lang/String;)V

    invoke-virtual {p3, v3}, Ljava/io/PrintWriter;->print(I)V

    const-string v5, ": "

    invoke-virtual {p3, v5}, Ljava/io/PrintWriter;->print(Ljava/lang/String;)V

    invoke-virtual {v4}, La/j/a/g;->toString()Ljava/lang/String;

    move-result-object v4

    invoke-virtual {p3, v4}, Ljava/io/PrintWriter;->println(Ljava/lang/String;)V

    add-int/lit8 v3, v3, 0x1

    goto :goto_1

    :cond_2
    iget-object v1, p0, La/j/a/t;->m:Ljava/util/ArrayList;

    if-eqz v1, :cond_3

    invoke-virtual {v1}, Ljava/util/ArrayList;->size()I

    move-result v1

    if-lez v1, :cond_3

    invoke-virtual {p3, p1}, Ljava/io/PrintWriter;->print(Ljava/lang/String;)V

    const-string v3, "Fragments Created Menus:"

    invoke-virtual {p3, v3}, Ljava/io/PrintWriter;->println(Ljava/lang/String;)V

    move v3, v2

    :goto_2
    if-ge v3, v1, :cond_3

    iget-object v4, p0, La/j/a/t;->m:Ljava/util/ArrayList;

    invoke-virtual {v4, v3}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v4

    check-cast v4, La/j/a/g;

    invoke-virtual {p3, p1}, Ljava/io/PrintWriter;->print(Ljava/lang/String;)V

    const-string v5, "  #"

    invoke-virtual {p3, v5}, Ljava/io/PrintWriter;->print(Ljava/lang/String;)V

    invoke-virtual {p3, v3}, Ljava/io/PrintWriter;->print(I)V

    const-string v5, ": "

    invoke-virtual {p3, v5}, Ljava/io/PrintWriter;->print(Ljava/lang/String;)V

    invoke-virtual {v4}, La/j/a/g;->toString()Ljava/lang/String;

    move-result-object v4

    invoke-virtual {p3, v4}, Ljava/io/PrintWriter;->println(Ljava/lang/String;)V

    add-int/lit8 v3, v3, 0x1

    goto :goto_2

    :cond_3
    iget-object v1, p0, La/j/a/t;->l:Ljava/util/ArrayList;

    if-eqz v1, :cond_4

    invoke-virtual {v1}, Ljava/util/ArrayList;->size()I

    move-result v1

    if-lez v1, :cond_4

    invoke-virtual {p3, p1}, Ljava/io/PrintWriter;->print(Ljava/lang/String;)V

    const-string v3, "Back Stack:"

    invoke-virtual {p3, v3}, Ljava/io/PrintWriter;->println(Ljava/lang/String;)V

    move v3, v2

    :goto_3
    if-ge v3, v1, :cond_4

    iget-object v4, p0, La/j/a/t;->l:Ljava/util/ArrayList;

    invoke-virtual {v4, v3}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v4

    check-cast v4, La/j/a/a;

    invoke-virtual {p3, p1}, Ljava/io/PrintWriter;->print(Ljava/lang/String;)V

    const-string v5, "  #"

    invoke-virtual {p3, v5}, Ljava/io/PrintWriter;->print(Ljava/lang/String;)V

    invoke-virtual {p3, v3}, Ljava/io/PrintWriter;->print(I)V

    const-string v5, ": "

    invoke-virtual {p3, v5}, Ljava/io/PrintWriter;->print(Ljava/lang/String;)V

    invoke-virtual {v4}, La/j/a/a;->toString()Ljava/lang/String;

    move-result-object v5

    invoke-virtual {p3, v5}, Ljava/io/PrintWriter;->println(Ljava/lang/String;)V

    invoke-virtual {v4, v0, p2, p3, p4}, La/j/a/a;->a(Ljava/lang/String;Ljava/io/FileDescriptor;Ljava/io/PrintWriter;[Ljava/lang/String;)V

    add-int/lit8 v3, v3, 0x1

    goto :goto_3

    :cond_4
    monitor-enter p0

    :try_start_0
    iget-object p2, p0, La/j/a/t;->n:Ljava/util/ArrayList;

    if-eqz p2, :cond_5

    iget-object p2, p0, La/j/a/t;->n:Ljava/util/ArrayList;

    invoke-virtual {p2}, Ljava/util/ArrayList;->size()I

    move-result p2

    if-lez p2, :cond_5

    invoke-virtual {p3, p1}, Ljava/io/PrintWriter;->print(Ljava/lang/String;)V

    const-string p4, "Back Stack Indices:"

    invoke-virtual {p3, p4}, Ljava/io/PrintWriter;->println(Ljava/lang/String;)V

    move p4, v2

    :goto_4
    if-ge p4, p2, :cond_5

    iget-object v0, p0, La/j/a/t;->n:Ljava/util/ArrayList;

    invoke-virtual {v0, p4}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v0

    check-cast v0, La/j/a/a;

    invoke-virtual {p3, p1}, Ljava/io/PrintWriter;->print(Ljava/lang/String;)V

    const-string v1, "  #"

    invoke-virtual {p3, v1}, Ljava/io/PrintWriter;->print(Ljava/lang/String;)V

    invoke-virtual {p3, p4}, Ljava/io/PrintWriter;->print(I)V

    const-string v1, ": "

    invoke-virtual {p3, v1}, Ljava/io/PrintWriter;->print(Ljava/lang/String;)V

    invoke-virtual {p3, v0}, Ljava/io/PrintWriter;->println(Ljava/lang/Object;)V

    add-int/lit8 p4, p4, 0x1

    goto :goto_4

    :cond_5
    iget-object p2, p0, La/j/a/t;->o:Ljava/util/ArrayList;

    if-eqz p2, :cond_6

    iget-object p2, p0, La/j/a/t;->o:Ljava/util/ArrayList;

    invoke-virtual {p2}, Ljava/util/ArrayList;->size()I

    move-result p2

    if-lez p2, :cond_6

    invoke-virtual {p3, p1}, Ljava/io/PrintWriter;->print(Ljava/lang/String;)V

    const-string p2, "mAvailBackStackIndices: "

    invoke-virtual {p3, p2}, Ljava/io/PrintWriter;->print(Ljava/lang/String;)V

    iget-object p2, p0, La/j/a/t;->o:Ljava/util/ArrayList;

    invoke-virtual {p2}, Ljava/util/ArrayList;->toArray()[Ljava/lang/Object;

    move-result-object p2

    invoke-static {p2}, Ljava/util/Arrays;->toString([Ljava/lang/Object;)Ljava/lang/String;

    move-result-object p2

    invoke-virtual {p3, p2}, Ljava/io/PrintWriter;->println(Ljava/lang/String;)V

    :cond_6
    monitor-exit p0
    :try_end_0
    .catchall {:try_start_0 .. :try_end_0} :catchall_0

    iget-object p2, p0, La/j/a/t;->g:Ljava/util/ArrayList;

    if-eqz p2, :cond_7

    invoke-virtual {p2}, Ljava/util/ArrayList;->size()I

    move-result p2

    if-lez p2, :cond_7

    invoke-virtual {p3, p1}, Ljava/io/PrintWriter;->print(Ljava/lang/String;)V

    const-string p4, "Pending Actions:"

    invoke-virtual {p3, p4}, Ljava/io/PrintWriter;->println(Ljava/lang/String;)V

    :goto_5
    if-ge v2, p2, :cond_7

    iget-object p4, p0, La/j/a/t;->g:Ljava/util/ArrayList;

    invoke-virtual {p4, v2}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object p4

    check-cast p4, La/j/a/t$h;

    invoke-virtual {p3, p1}, Ljava/io/PrintWriter;->print(Ljava/lang/String;)V

    const-string v0, "  #"

    invoke-virtual {p3, v0}, Ljava/io/PrintWriter;->print(Ljava/lang/String;)V

    invoke-virtual {p3, v2}, Ljava/io/PrintWriter;->print(I)V

    const-string v0, ": "

    invoke-virtual {p3, v0}, Ljava/io/PrintWriter;->print(Ljava/lang/String;)V

    invoke-virtual {p3, p4}, Ljava/io/PrintWriter;->println(Ljava/lang/Object;)V

    add-int/lit8 v2, v2, 0x1

    goto :goto_5

    :cond_7
    invoke-virtual {p3, p1}, Ljava/io/PrintWriter;->print(Ljava/lang/String;)V

    const-string p2, "FragmentManager misc state:"

    invoke-virtual {p3, p2}, Ljava/io/PrintWriter;->println(Ljava/lang/String;)V

    invoke-virtual {p3, p1}, Ljava/io/PrintWriter;->print(Ljava/lang/String;)V

    const-string p2, "  mHost="

    invoke-virtual {p3, p2}, Ljava/io/PrintWriter;->print(Ljava/lang/String;)V

    iget-object p2, p0, La/j/a/t;->s:La/j/a/l;

    invoke-virtual {p3, p2}, Ljava/io/PrintWriter;->println(Ljava/lang/Object;)V

    invoke-virtual {p3, p1}, Ljava/io/PrintWriter;->print(Ljava/lang/String;)V

    const-string p2, "  mContainer="

    invoke-virtual {p3, p2}, Ljava/io/PrintWriter;->print(Ljava/lang/String;)V

    iget-object p2, p0, La/j/a/t;->t:La/j/a/j;

    invoke-virtual {p3, p2}, Ljava/io/PrintWriter;->println(Ljava/lang/Object;)V

    iget-object p2, p0, La/j/a/t;->u:La/j/a/g;

    if-eqz p2, :cond_8

    invoke-virtual {p3, p1}, Ljava/io/PrintWriter;->print(Ljava/lang/String;)V

    const-string p2, "  mParent="

    invoke-virtual {p3, p2}, Ljava/io/PrintWriter;->print(Ljava/lang/String;)V

    iget-object p2, p0, La/j/a/t;->u:La/j/a/g;

    invoke-virtual {p3, p2}, Ljava/io/PrintWriter;->println(Ljava/lang/Object;)V

    :cond_8
    invoke-virtual {p3, p1}, Ljava/io/PrintWriter;->print(Ljava/lang/String;)V

    const-string p2, "  mCurState="

    invoke-virtual {p3, p2}, Ljava/io/PrintWriter;->print(Ljava/lang/String;)V

    iget p2, p0, La/j/a/t;->r:I

    invoke-virtual {p3, p2}, Ljava/io/PrintWriter;->print(I)V

    const-string p2, " mStateSaved="

    invoke-virtual {p3, p2}, Ljava/io/PrintWriter;->print(Ljava/lang/String;)V

    iget-boolean p2, p0, La/j/a/t;->x:Z

    invoke-virtual {p3, p2}, Ljava/io/PrintWriter;->print(Z)V

    const-string p2, " mStopped="

    invoke-virtual {p3, p2}, Ljava/io/PrintWriter;->print(Ljava/lang/String;)V

    iget-boolean p2, p0, La/j/a/t;->y:Z

    invoke-virtual {p3, p2}, Ljava/io/PrintWriter;->print(Z)V

    const-string p2, " mDestroyed="

    invoke-virtual {p3, p2}, Ljava/io/PrintWriter;->print(Ljava/lang/String;)V

    iget-boolean p2, p0, La/j/a/t;->z:Z

    invoke-virtual {p3, p2}, Ljava/io/PrintWriter;->println(Z)V

    iget-boolean p2, p0, La/j/a/t;->w:Z

    if-eqz p2, :cond_9

    invoke-virtual {p3, p1}, Ljava/io/PrintWriter;->print(Ljava/lang/String;)V

    const-string p2, "  mNeedMenuInvalidate="

    invoke-virtual {p3, p2}, Ljava/io/PrintWriter;->print(Ljava/lang/String;)V

    iget-boolean p2, p0, La/j/a/t;->w:Z

    invoke-virtual {p3, p2}, Ljava/io/PrintWriter;->println(Z)V

    :cond_9
    iget-object p2, p0, La/j/a/t;->A:Ljava/lang/String;

    if-eqz p2, :cond_a

    invoke-virtual {p3, p1}, Ljava/io/PrintWriter;->print(Ljava/lang/String;)V

    const-string p1, "  mNoTransactionsBecause="

    invoke-virtual {p3, p1}, Ljava/io/PrintWriter;->print(Ljava/lang/String;)V

    iget-object p1, p0, La/j/a/t;->A:Ljava/lang/String;

    invoke-virtual {p3, p1}, Ljava/io/PrintWriter;->println(Ljava/lang/String;)V

    :cond_a
    return-void

    :catchall_0
    move-exception p1

    :try_start_1
    monitor-exit p0
    :try_end_1
    .catchall {:try_start_1 .. :try_end_1} :catchall_0

    throw p1
.end method

.method public a(Z)V
    .locals 2

    iget-object v0, p0, La/j/a/t;->j:Ljava/util/ArrayList;

    invoke-virtual {v0}, Ljava/util/ArrayList;->size()I

    move-result v0

    add-int/lit8 v0, v0, -0x1

    :goto_0
    if-ltz v0, :cond_1

    iget-object v1, p0, La/j/a/t;->j:Ljava/util/ArrayList;

    invoke-virtual {v1, v0}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v1

    check-cast v1, La/j/a/g;

    if-eqz v1, :cond_0

    invoke-virtual {v1, p1}, La/j/a/g;->d(Z)V

    :cond_0
    add-int/lit8 v0, v0, -0x1

    goto :goto_0

    :cond_1
    return-void
.end method

.method public a(Landroid/view/Menu;Landroid/view/MenuInflater;)Z
    .locals 7

    iget v0, p0, La/j/a/t;->r:I

    const/4 v1, 0x0

    const/4 v2, 0x1

    if-ge v0, v2, :cond_0

    return v1

    :cond_0
    const/4 v0, 0x0

    move-object v3, v0

    move v0, v1

    move v4, v0

    :goto_0
    iget-object v5, p0, La/j/a/t;->j:Ljava/util/ArrayList;

    invoke-virtual {v5}, Ljava/util/ArrayList;->size()I

    move-result v5

    if-ge v0, v5, :cond_3

    iget-object v5, p0, La/j/a/t;->j:Ljava/util/ArrayList;

    invoke-virtual {v5, v0}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v5

    check-cast v5, La/j/a/g;

    if-eqz v5, :cond_2

    invoke-virtual {v5, p1, p2}, La/j/a/g;->b(Landroid/view/Menu;Landroid/view/MenuInflater;)Z

    move-result v6

    if-eqz v6, :cond_2

    if-nez v3, :cond_1

    new-instance v3, Ljava/util/ArrayList;

    invoke-direct {v3}, Ljava/util/ArrayList;-><init>()V

    :cond_1
    invoke-virtual {v3, v5}, Ljava/util/ArrayList;->add(Ljava/lang/Object;)Z

    move v4, v2

    :cond_2
    add-int/lit8 v0, v0, 0x1

    goto :goto_0

    :cond_3
    iget-object p1, p0, La/j/a/t;->m:Ljava/util/ArrayList;

    if-eqz p1, :cond_6

    :goto_1
    iget-object p1, p0, La/j/a/t;->m:Ljava/util/ArrayList;

    invoke-virtual {p1}, Ljava/util/ArrayList;->size()I

    move-result p1

    if-ge v1, p1, :cond_6

    iget-object p1, p0, La/j/a/t;->m:Ljava/util/ArrayList;

    invoke-virtual {p1, v1}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object p1

    check-cast p1, La/j/a/g;

    if-eqz v3, :cond_4

    invoke-virtual {v3, p1}, Ljava/util/ArrayList;->contains(Ljava/lang/Object;)Z

    move-result p2

    if-nez p2, :cond_5

    :cond_4
    invoke-virtual {p1}, La/j/a/g;->H()V

    :cond_5
    add-int/lit8 v1, v1, 0x1

    goto :goto_1

    :cond_6
    iput-object v3, p0, La/j/a/t;->m:Ljava/util/ArrayList;

    return v4
.end method

.method public a(Landroid/view/MenuItem;)Z
    .locals 4

    iget v0, p0, La/j/a/t;->r:I

    const/4 v1, 0x0

    const/4 v2, 0x1

    if-ge v0, v2, :cond_0

    return v1

    :cond_0
    move v0, v1

    :goto_0
    iget-object v3, p0, La/j/a/t;->j:Ljava/util/ArrayList;

    invoke-virtual {v3}, Ljava/util/ArrayList;->size()I

    move-result v3

    if-ge v0, v3, :cond_2

    iget-object v3, p0, La/j/a/t;->j:Ljava/util/ArrayList;

    invoke-virtual {v3, v0}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v3

    check-cast v3, La/j/a/g;

    if-eqz v3, :cond_1

    invoke-virtual {v3, p1}, La/j/a/g;->c(Landroid/view/MenuItem;)Z

    move-result v3

    if-eqz v3, :cond_1

    return v2

    :cond_1
    add-int/lit8 v0, v0, 0x1

    goto :goto_0

    :cond_2
    return v1
.end method

.method a(Ljava/util/ArrayList;Ljava/util/ArrayList;Ljava/lang/String;II)Z
    .locals 5
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "(",
            "Ljava/util/ArrayList<",
            "La/j/a/a;",
            ">;",
            "Ljava/util/ArrayList<",
            "Ljava/lang/Boolean;",
            ">;",
            "Ljava/lang/String;",
            "II)Z"
        }
    .end annotation

    iget-object v0, p0, La/j/a/t;->l:Ljava/util/ArrayList;

    const/4 v1, 0x0

    if-nez v0, :cond_0

    return v1

    :cond_0
    const/4 v2, 0x1

    if-nez p3, :cond_2

    if-gez p4, :cond_2

    and-int/lit8 v3, p5, 0x1

    if-nez v3, :cond_2

    invoke-virtual {v0}, Ljava/util/ArrayList;->size()I

    move-result p3

    sub-int/2addr p3, v2

    if-gez p3, :cond_1

    return v1

    :cond_1
    iget-object p4, p0, La/j/a/t;->l:Ljava/util/ArrayList;

    invoke-virtual {p4, p3}, Ljava/util/ArrayList;->remove(I)Ljava/lang/Object;

    move-result-object p3

    invoke-virtual {p1, p3}, Ljava/util/ArrayList;->add(Ljava/lang/Object;)Z

    invoke-static {v2}, Ljava/lang/Boolean;->valueOf(Z)Ljava/lang/Boolean;

    move-result-object p1

    invoke-virtual {p2, p1}, Ljava/util/ArrayList;->add(Ljava/lang/Object;)Z

    goto/16 :goto_6

    :cond_2
    if-nez p3, :cond_4

    if-ltz p4, :cond_3

    goto :goto_0

    :cond_3
    const/4 p3, -0x1

    move v0, p3

    goto :goto_4

    :cond_4
    :goto_0
    iget-object v0, p0, La/j/a/t;->l:Ljava/util/ArrayList;

    invoke-virtual {v0}, Ljava/util/ArrayList;->size()I

    move-result v0

    sub-int/2addr v0, v2

    :goto_1
    if-ltz v0, :cond_7

    iget-object v3, p0, La/j/a/t;->l:Ljava/util/ArrayList;

    invoke-virtual {v3, v0}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v3

    check-cast v3, La/j/a/a;

    if-eqz p3, :cond_5

    invoke-virtual {v3}, La/j/a/a;->b()Ljava/lang/String;

    move-result-object v4

    invoke-virtual {p3, v4}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v4

    if-eqz v4, :cond_5

    goto :goto_2

    :cond_5
    if-ltz p4, :cond_6

    iget v3, v3, La/j/a/a;->m:I

    if-ne p4, v3, :cond_6

    goto :goto_2

    :cond_6
    add-int/lit8 v0, v0, -0x1

    goto :goto_1

    :cond_7
    :goto_2
    if-gez v0, :cond_8

    return v1

    :cond_8
    and-int/2addr p5, v2

    if-eqz p5, :cond_b

    :cond_9
    :goto_3
    add-int/lit8 v0, v0, -0x1

    if-ltz v0, :cond_b

    iget-object p5, p0, La/j/a/t;->l:Ljava/util/ArrayList;

    invoke-virtual {p5, v0}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object p5

    check-cast p5, La/j/a/a;

    if-eqz p3, :cond_a

    invoke-virtual {p5}, La/j/a/a;->b()Ljava/lang/String;

    move-result-object v3

    invoke-virtual {p3, v3}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v3

    if-nez v3, :cond_9

    :cond_a
    if-ltz p4, :cond_b

    iget p5, p5, La/j/a/a;->m:I

    if-ne p4, p5, :cond_b

    goto :goto_3

    :cond_b
    :goto_4
    iget-object p3, p0, La/j/a/t;->l:Ljava/util/ArrayList;

    invoke-virtual {p3}, Ljava/util/ArrayList;->size()I

    move-result p3

    sub-int/2addr p3, v2

    if-ne v0, p3, :cond_c

    return v1

    :cond_c
    iget-object p3, p0, La/j/a/t;->l:Ljava/util/ArrayList;

    invoke-virtual {p3}, Ljava/util/ArrayList;->size()I

    move-result p3

    sub-int/2addr p3, v2

    :goto_5
    if-le p3, v0, :cond_d

    iget-object p4, p0, La/j/a/t;->l:Ljava/util/ArrayList;

    invoke-virtual {p4, p3}, Ljava/util/ArrayList;->remove(I)Ljava/lang/Object;

    move-result-object p4

    invoke-virtual {p1, p4}, Ljava/util/ArrayList;->add(Ljava/lang/Object;)Z

    invoke-static {v2}, Ljava/lang/Boolean;->valueOf(Z)Ljava/lang/Boolean;

    move-result-object p4

    invoke-virtual {p2, p4}, Ljava/util/ArrayList;->add(Ljava/lang/Object;)Z

    add-int/lit8 p3, p3, -0x1

    goto :goto_5

    :cond_d
    :goto_6
    return v2
.end method

.method public b(Ljava/lang/String;)La/j/a/g;
    .locals 2

    iget-object v0, p0, La/j/a/t;->k:Landroid/util/SparseArray;

    if-eqz v0, :cond_1

    if-eqz p1, :cond_1

    invoke-virtual {v0}, Landroid/util/SparseArray;->size()I

    move-result v0

    add-int/lit8 v0, v0, -0x1

    :goto_0
    if-ltz v0, :cond_1

    iget-object v1, p0, La/j/a/t;->k:Landroid/util/SparseArray;

    invoke-virtual {v1, v0}, Landroid/util/SparseArray;->valueAt(I)Ljava/lang/Object;

    move-result-object v1

    check-cast v1, La/j/a/g;

    if-eqz v1, :cond_0

    invoke-virtual {v1, p1}, La/j/a/g;->a(Ljava/lang/String;)La/j/a/g;

    move-result-object v1

    if-eqz v1, :cond_0

    return-object v1

    :cond_0
    add-int/lit8 v0, v0, -0x1

    goto :goto_0

    :cond_1
    const/4 p1, 0x0

    return-object p1
.end method

.method public b(I)V
    .locals 3

    monitor-enter p0

    :try_start_0
    iget-object v0, p0, La/j/a/t;->n:Ljava/util/ArrayList;

    const/4 v1, 0x0

    invoke-virtual {v0, p1, v1}, Ljava/util/ArrayList;->set(ILjava/lang/Object;)Ljava/lang/Object;

    iget-object v0, p0, La/j/a/t;->o:Ljava/util/ArrayList;

    if-nez v0, :cond_0

    new-instance v0, Ljava/util/ArrayList;

    invoke-direct {v0}, Ljava/util/ArrayList;-><init>()V

    iput-object v0, p0, La/j/a/t;->o:Ljava/util/ArrayList;

    :cond_0
    sget-boolean v0, La/j/a/t;->a:Z

    if-eqz v0, :cond_1

    const-string v0, "FragmentManager"

    new-instance v1, Ljava/lang/StringBuilder;

    invoke-direct {v1}, Ljava/lang/StringBuilder;-><init>()V

    const-string v2, "Freeing back stack index "

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v1, p1}, Ljava/lang/StringBuilder;->append(I)Ljava/lang/StringBuilder;

    invoke-virtual {v1}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v1

    invoke-static {v0, v1}, Landroid/util/Log;->v(Ljava/lang/String;Ljava/lang/String;)I

    :cond_1
    iget-object v0, p0, La/j/a/t;->o:Ljava/util/ArrayList;

    invoke-static {p1}, Ljava/lang/Integer;->valueOf(I)Ljava/lang/Integer;

    move-result-object p1

    invoke-virtual {v0, p1}, Ljava/util/ArrayList;->add(Ljava/lang/Object;)Z

    monitor-exit p0

    return-void

    :catchall_0
    move-exception p1

    monitor-exit p0
    :try_end_0
    .catchall {:try_start_0 .. :try_end_0} :catchall_0

    throw p1
.end method

.method b(La/j/a/g;)V
    .locals 7

    iget-object v0, p1, La/j/a/g;->K:Landroid/view/View;

    const/4 v1, 0x1

    const/4 v2, 0x0

    if-eqz v0, :cond_5

    invoke-virtual {p1}, La/j/a/g;->q()I

    move-result v0

    iget-boolean v3, p1, La/j/a/g;->C:Z

    xor-int/2addr v3, v1

    invoke-virtual {p1}, La/j/a/g;->r()I

    move-result v4

    invoke-virtual {p0, p1, v0, v3, v4}, La/j/a/t;->a(La/j/a/g;IZI)La/j/a/t$c;

    move-result-object v0

    if-eqz v0, :cond_2

    iget-object v3, v0, La/j/a/t$c;->b:Landroid/animation/Animator;

    if-eqz v3, :cond_2

    iget-object v4, p1, La/j/a/g;->K:Landroid/view/View;

    invoke-virtual {v3, v4}, Landroid/animation/Animator;->setTarget(Ljava/lang/Object;)V

    iget-boolean v3, p1, La/j/a/g;->C:Z

    if-eqz v3, :cond_1

    invoke-virtual {p1}, La/j/a/g;->B()Z

    move-result v3

    if-eqz v3, :cond_0

    invoke-virtual {p1, v2}, La/j/a/g;->f(Z)V

    goto :goto_0

    :cond_0
    iget-object v3, p1, La/j/a/g;->J:Landroid/view/ViewGroup;

    iget-object v4, p1, La/j/a/g;->K:Landroid/view/View;

    invoke-virtual {v3, v4}, Landroid/view/ViewGroup;->startViewTransition(Landroid/view/View;)V

    iget-object v5, v0, La/j/a/t$c;->b:Landroid/animation/Animator;

    new-instance v6, La/j/a/r;

    invoke-direct {v6, p0, v3, v4, p1}, La/j/a/r;-><init>(La/j/a/t;Landroid/view/ViewGroup;Landroid/view/View;La/j/a/g;)V

    invoke-virtual {v5, v6}, Landroid/animation/Animator;->addListener(Landroid/animation/Animator$AnimatorListener;)V

    goto :goto_0

    :cond_1
    iget-object v3, p1, La/j/a/g;->K:Landroid/view/View;

    invoke-virtual {v3, v2}, Landroid/view/View;->setVisibility(I)V

    :goto_0
    iget-object v3, p1, La/j/a/g;->K:Landroid/view/View;

    invoke-static {v3, v0}, La/j/a/t;->b(Landroid/view/View;La/j/a/t$c;)V

    iget-object v0, v0, La/j/a/t$c;->b:Landroid/animation/Animator;

    invoke-virtual {v0}, Landroid/animation/Animator;->start()V

    goto :goto_2

    :cond_2
    if-eqz v0, :cond_3

    iget-object v3, p1, La/j/a/g;->K:Landroid/view/View;

    invoke-static {v3, v0}, La/j/a/t;->b(Landroid/view/View;La/j/a/t$c;)V

    iget-object v3, p1, La/j/a/g;->K:Landroid/view/View;

    iget-object v4, v0, La/j/a/t$c;->a:Landroid/view/animation/Animation;

    invoke-virtual {v3, v4}, Landroid/view/View;->startAnimation(Landroid/view/animation/Animation;)V

    iget-object v0, v0, La/j/a/t$c;->a:Landroid/view/animation/Animation;

    invoke-virtual {v0}, Landroid/view/animation/Animation;->start()V

    :cond_3
    iget-boolean v0, p1, La/j/a/g;->C:Z

    if-eqz v0, :cond_4

    invoke-virtual {p1}, La/j/a/g;->B()Z

    move-result v0

    if-nez v0, :cond_4

    const/16 v0, 0x8

    goto :goto_1

    :cond_4
    move v0, v2

    :goto_1
    iget-object v3, p1, La/j/a/g;->K:Landroid/view/View;

    invoke-virtual {v3, v0}, Landroid/view/View;->setVisibility(I)V

    invoke-virtual {p1}, La/j/a/g;->B()Z

    move-result v0

    if-eqz v0, :cond_5

    invoke-virtual {p1, v2}, La/j/a/g;->f(Z)V

    :cond_5
    :goto_2
    iget-boolean v0, p1, La/j/a/g;->m:Z

    if-eqz v0, :cond_6

    iget-boolean v0, p1, La/j/a/g;->G:Z

    if-eqz v0, :cond_6

    iget-boolean v0, p1, La/j/a/g;->H:Z

    if-eqz v0, :cond_6

    iput-boolean v1, p0, La/j/a/t;->w:Z

    :cond_6
    iput-boolean v2, p1, La/j/a/g;->Q:Z

    iget-boolean v0, p1, La/j/a/g;->C:Z

    invoke-virtual {p1, v0}, La/j/a/g;->a(Z)V

    return-void
.end method

.method b(La/j/a/g;Landroid/content/Context;Z)V
    .locals 3

    iget-object v0, p0, La/j/a/t;->u:La/j/a/g;

    if-eqz v0, :cond_0

    invoke-virtual {v0}, La/j/a/g;->o()La/j/a/m;

    move-result-object v0

    instance-of v1, v0, La/j/a/t;

    if-eqz v1, :cond_0

    check-cast v0, La/j/a/t;

    const/4 v1, 0x1

    invoke-virtual {v0, p1, p2, v1}, La/j/a/t;->b(La/j/a/g;Landroid/content/Context;Z)V

    :cond_0
    iget-object v0, p0, La/j/a/t;->q:Ljava/util/concurrent/CopyOnWriteArrayList;

    invoke-virtual {v0}, Ljava/util/concurrent/CopyOnWriteArrayList;->iterator()Ljava/util/Iterator;

    move-result-object v0

    :cond_1
    :goto_0
    invoke-interface {v0}, Ljava/util/Iterator;->hasNext()Z

    move-result v1

    if-eqz v1, :cond_3

    invoke-interface {v0}, Ljava/util/Iterator;->next()Ljava/lang/Object;

    move-result-object v1

    check-cast v1, La/j/a/t$f;

    if-eqz p3, :cond_2

    iget-boolean v2, v1, La/j/a/t$f;->b:Z

    if-eqz v2, :cond_1

    :cond_2
    iget-object v1, v1, La/j/a/t$f;->a:La/j/a/m$b;

    invoke-virtual {v1, p0, p1, p2}, La/j/a/m$b;->b(La/j/a/m;La/j/a/g;Landroid/content/Context;)V

    goto :goto_0

    :cond_3
    return-void
.end method

.method b(La/j/a/g;Landroid/os/Bundle;Z)V
    .locals 3

    iget-object v0, p0, La/j/a/t;->u:La/j/a/g;

    if-eqz v0, :cond_0

    invoke-virtual {v0}, La/j/a/g;->o()La/j/a/m;

    move-result-object v0

    instance-of v1, v0, La/j/a/t;

    if-eqz v1, :cond_0

    check-cast v0, La/j/a/t;

    const/4 v1, 0x1

    invoke-virtual {v0, p1, p2, v1}, La/j/a/t;->b(La/j/a/g;Landroid/os/Bundle;Z)V

    :cond_0
    iget-object v0, p0, La/j/a/t;->q:Ljava/util/concurrent/CopyOnWriteArrayList;

    invoke-virtual {v0}, Ljava/util/concurrent/CopyOnWriteArrayList;->iterator()Ljava/util/Iterator;

    move-result-object v0

    :cond_1
    :goto_0
    invoke-interface {v0}, Ljava/util/Iterator;->hasNext()Z

    move-result v1

    if-eqz v1, :cond_3

    invoke-interface {v0}, Ljava/util/Iterator;->next()Ljava/lang/Object;

    move-result-object v1

    check-cast v1, La/j/a/t$f;

    if-eqz p3, :cond_2

    iget-boolean v2, v1, La/j/a/t$f;->b:Z

    if-eqz v2, :cond_1

    :cond_2
    iget-object v1, v1, La/j/a/t$f;->a:La/j/a/m$b;

    invoke-virtual {v1, p0, p1, p2}, La/j/a/m$b;->b(La/j/a/m;La/j/a/g;Landroid/os/Bundle;)V

    goto :goto_0

    :cond_3
    return-void
.end method

.method b(La/j/a/g;Z)V
    .locals 3

    iget-object v0, p0, La/j/a/t;->u:La/j/a/g;

    if-eqz v0, :cond_0

    invoke-virtual {v0}, La/j/a/g;->o()La/j/a/m;

    move-result-object v0

    instance-of v1, v0, La/j/a/t;

    if-eqz v1, :cond_0

    check-cast v0, La/j/a/t;

    const/4 v1, 0x1

    invoke-virtual {v0, p1, v1}, La/j/a/t;->b(La/j/a/g;Z)V

    :cond_0
    iget-object v0, p0, La/j/a/t;->q:Ljava/util/concurrent/CopyOnWriteArrayList;

    invoke-virtual {v0}, Ljava/util/concurrent/CopyOnWriteArrayList;->iterator()Ljava/util/Iterator;

    move-result-object v0

    :cond_1
    :goto_0
    invoke-interface {v0}, Ljava/util/Iterator;->hasNext()Z

    move-result v1

    if-eqz v1, :cond_3

    invoke-interface {v0}, Ljava/util/Iterator;->next()Ljava/lang/Object;

    move-result-object v1

    check-cast v1, La/j/a/t$f;

    if-eqz p2, :cond_2

    iget-boolean v2, v1, La/j/a/t$f;->b:Z

    if-eqz v2, :cond_1

    :cond_2
    iget-object v1, v1, La/j/a/t$f;->a:La/j/a/m$b;

    invoke-virtual {v1, p0, p1}, La/j/a/m$b;->a(La/j/a/m;La/j/a/g;)V

    goto :goto_0

    :cond_3
    return-void
.end method

.method public b(Z)V
    .locals 2

    iget-object v0, p0, La/j/a/t;->j:Ljava/util/ArrayList;

    invoke-virtual {v0}, Ljava/util/ArrayList;->size()I

    move-result v0

    add-int/lit8 v0, v0, -0x1

    :goto_0
    if-ltz v0, :cond_1

    iget-object v1, p0, La/j/a/t;->j:Ljava/util/ArrayList;

    invoke-virtual {v1, v0}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v1

    check-cast v1, La/j/a/g;

    if-eqz v1, :cond_0

    invoke-virtual {v1, p1}, La/j/a/g;->e(Z)V

    :cond_0
    add-int/lit8 v0, v0, -0x1

    goto :goto_0

    :cond_1
    return-void
.end method

.method public b()Z
    .locals 1

    iget-boolean v0, p0, La/j/a/t;->x:Z

    if-nez v0, :cond_1

    iget-boolean v0, p0, La/j/a/t;->y:Z

    if-eqz v0, :cond_0

    goto :goto_0

    :cond_0
    const/4 v0, 0x0

    goto :goto_1

    :cond_1
    :goto_0
    const/4 v0, 0x1

    :goto_1
    return v0
.end method

.method public b(Landroid/view/Menu;)Z
    .locals 4

    iget v0, p0, La/j/a/t;->r:I

    const/4 v1, 0x0

    const/4 v2, 0x1

    if-ge v0, v2, :cond_0

    return v1

    :cond_0
    move v0, v1

    :goto_0
    iget-object v3, p0, La/j/a/t;->j:Ljava/util/ArrayList;

    invoke-virtual {v3}, Ljava/util/ArrayList;->size()I

    move-result v3

    if-ge v1, v3, :cond_2

    iget-object v3, p0, La/j/a/t;->j:Ljava/util/ArrayList;

    invoke-virtual {v3, v1}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v3

    check-cast v3, La/j/a/g;

    if-eqz v3, :cond_1

    invoke-virtual {v3, p1}, La/j/a/g;->d(Landroid/view/Menu;)Z

    move-result v3

    if-eqz v3, :cond_1

    move v0, v2

    :cond_1
    add-int/lit8 v1, v1, 0x1

    goto :goto_0

    :cond_2
    return v0
.end method

.method public b(Landroid/view/MenuItem;)Z
    .locals 4

    iget v0, p0, La/j/a/t;->r:I

    const/4 v1, 0x0

    const/4 v2, 0x1

    if-ge v0, v2, :cond_0

    return v1

    :cond_0
    move v0, v1

    :goto_0
    iget-object v3, p0, La/j/a/t;->j:Ljava/util/ArrayList;

    invoke-virtual {v3}, Ljava/util/ArrayList;->size()I

    move-result v3

    if-ge v0, v3, :cond_2

    iget-object v3, p0, La/j/a/t;->j:Ljava/util/ArrayList;

    invoke-virtual {v3, v0}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v3

    check-cast v3, La/j/a/g;

    if-eqz v3, :cond_1

    invoke-virtual {v3, p1}, La/j/a/g;->d(Landroid/view/MenuItem;)Z

    move-result v3

    if-eqz v3, :cond_1

    return v2

    :cond_1
    add-int/lit8 v0, v0, 0x1

    goto :goto_0

    :cond_2
    return v1
.end method

.method public c(La/j/a/g;)V
    .locals 3

    sget-boolean v0, La/j/a/t;->a:Z

    if-eqz v0, :cond_0

    new-instance v0, Ljava/lang/StringBuilder;

    invoke-direct {v0}, Ljava/lang/StringBuilder;-><init>()V

    const-string v1, "detach: "

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v0, p1}, Ljava/lang/StringBuilder;->append(Ljava/lang/Object;)Ljava/lang/StringBuilder;

    invoke-virtual {v0}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    const-string v1, "FragmentManager"

    invoke-static {v1, v0}, Landroid/util/Log;->v(Ljava/lang/String;Ljava/lang/String;)I

    :cond_0
    iget-boolean v0, p1, La/j/a/g;->D:Z

    if-nez v0, :cond_3

    const/4 v0, 0x1

    iput-boolean v0, p1, La/j/a/g;->D:Z

    iget-boolean v1, p1, La/j/a/g;->m:Z

    if-eqz v1, :cond_3

    sget-boolean v1, La/j/a/t;->a:Z

    if-eqz v1, :cond_1

    new-instance v1, Ljava/lang/StringBuilder;

    invoke-direct {v1}, Ljava/lang/StringBuilder;-><init>()V

    const-string v2, "remove from detach: "

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v1, p1}, Ljava/lang/StringBuilder;->append(Ljava/lang/Object;)Ljava/lang/StringBuilder;

    invoke-virtual {v1}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v1

    const-string v2, "FragmentManager"

    invoke-static {v2, v1}, Landroid/util/Log;->v(Ljava/lang/String;Ljava/lang/String;)I

    :cond_1
    iget-object v1, p0, La/j/a/t;->j:Ljava/util/ArrayList;

    monitor-enter v1

    :try_start_0
    iget-object v2, p0, La/j/a/t;->j:Ljava/util/ArrayList;

    invoke-virtual {v2, p1}, Ljava/util/ArrayList;->remove(Ljava/lang/Object;)Z

    monitor-exit v1
    :try_end_0
    .catchall {:try_start_0 .. :try_end_0} :catchall_0

    iget-boolean v1, p1, La/j/a/g;->G:Z

    if-eqz v1, :cond_2

    iget-boolean v1, p1, La/j/a/g;->H:Z

    if-eqz v1, :cond_2

    iput-boolean v0, p0, La/j/a/t;->w:Z

    :cond_2
    const/4 v0, 0x0

    iput-boolean v0, p1, La/j/a/g;->m:Z

    goto :goto_0

    :catchall_0
    move-exception p1

    :try_start_1
    monitor-exit v1
    :try_end_1
    .catchall {:try_start_1 .. :try_end_1} :catchall_0

    throw p1

    :cond_3
    :goto_0
    return-void
.end method

.method c(La/j/a/g;Landroid/os/Bundle;Z)V
    .locals 3

    iget-object v0, p0, La/j/a/t;->u:La/j/a/g;

    if-eqz v0, :cond_0

    invoke-virtual {v0}, La/j/a/g;->o()La/j/a/m;

    move-result-object v0

    instance-of v1, v0, La/j/a/t;

    if-eqz v1, :cond_0

    check-cast v0, La/j/a/t;

    const/4 v1, 0x1

    invoke-virtual {v0, p1, p2, v1}, La/j/a/t;->c(La/j/a/g;Landroid/os/Bundle;Z)V

    :cond_0
    iget-object v0, p0, La/j/a/t;->q:Ljava/util/concurrent/CopyOnWriteArrayList;

    invoke-virtual {v0}, Ljava/util/concurrent/CopyOnWriteArrayList;->iterator()Ljava/util/Iterator;

    move-result-object v0

    :cond_1
    :goto_0
    invoke-interface {v0}, Ljava/util/Iterator;->hasNext()Z

    move-result v1

    if-eqz v1, :cond_3

    invoke-interface {v0}, Ljava/util/Iterator;->next()Ljava/lang/Object;

    move-result-object v1

    check-cast v1, La/j/a/t$f;

    if-eqz p3, :cond_2

    iget-boolean v2, v1, La/j/a/t$f;->b:Z

    if-eqz v2, :cond_1

    :cond_2
    iget-object v1, v1, La/j/a/t$f;->a:La/j/a/m$b;

    invoke-virtual {v1, p0, p1, p2}, La/j/a/m$b;->c(La/j/a/m;La/j/a/g;Landroid/os/Bundle;)V

    goto :goto_0

    :cond_3
    return-void
.end method

.method c(La/j/a/g;Z)V
    .locals 3

    iget-object v0, p0, La/j/a/t;->u:La/j/a/g;

    if-eqz v0, :cond_0

    invoke-virtual {v0}, La/j/a/g;->o()La/j/a/m;

    move-result-object v0

    instance-of v1, v0, La/j/a/t;

    if-eqz v1, :cond_0

    check-cast v0, La/j/a/t;

    const/4 v1, 0x1

    invoke-virtual {v0, p1, v1}, La/j/a/t;->c(La/j/a/g;Z)V

    :cond_0
    iget-object v0, p0, La/j/a/t;->q:Ljava/util/concurrent/CopyOnWriteArrayList;

    invoke-virtual {v0}, Ljava/util/concurrent/CopyOnWriteArrayList;->iterator()Ljava/util/Iterator;

    move-result-object v0

    :cond_1
    :goto_0
    invoke-interface {v0}, Ljava/util/Iterator;->hasNext()Z

    move-result v1

    if-eqz v1, :cond_3

    invoke-interface {v0}, Ljava/util/Iterator;->next()Ljava/lang/Object;

    move-result-object v1

    check-cast v1, La/j/a/t$f;

    if-eqz p2, :cond_2

    iget-boolean v2, v1, La/j/a/t$f;->b:Z

    if-eqz v2, :cond_1

    :cond_2
    iget-object v1, v1, La/j/a/t$f;->a:La/j/a/m$b;

    invoke-virtual {v1, p0, p1}, La/j/a/m$b;->b(La/j/a/m;La/j/a/g;)V

    goto :goto_0

    :cond_3
    return-void
.end method

.method public c()Z
    .locals 3

    invoke-direct {p0}, La/j/a/t;->y()V

    const/4 v0, 0x0

    const/4 v1, -0x1

    const/4 v2, 0x0

    invoke-direct {p0, v0, v1, v2}, La/j/a/t;->a(Ljava/lang/String;II)Z

    move-result v0

    return v0
.end method

.method c(I)Z
    .locals 1

    iget v0, p0, La/j/a/t;->r:I

    if-lt v0, p1, :cond_0

    const/4 p1, 0x1

    goto :goto_0

    :cond_0
    const/4 p1, 0x0

    :goto_0
    return p1
.end method

.method public d()V
    .locals 1

    const/4 v0, 0x0

    iput-boolean v0, p0, La/j/a/t;->x:Z

    iput-boolean v0, p0, La/j/a/t;->y:Z

    const/4 v0, 0x2

    invoke-direct {p0, v0}, La/j/a/t;->e(I)V

    return-void
.end method

.method d(La/j/a/g;)V
    .locals 3

    iget-boolean v0, p1, La/j/a/g;->o:Z

    if-eqz v0, :cond_2

    iget-boolean v0, p1, La/j/a/g;->r:Z

    if-nez v0, :cond_2

    iget-object v0, p1, La/j/a/g;->d:Landroid/os/Bundle;

    invoke-virtual {p1, v0}, La/j/a/g;->i(Landroid/os/Bundle;)Landroid/view/LayoutInflater;

    move-result-object v0

    iget-object v1, p1, La/j/a/g;->d:Landroid/os/Bundle;

    const/4 v2, 0x0

    invoke-virtual {p1, v0, v2, v1}, La/j/a/g;->b(Landroid/view/LayoutInflater;Landroid/view/ViewGroup;Landroid/os/Bundle;)V

    iget-object v0, p1, La/j/a/g;->K:Landroid/view/View;

    if-eqz v0, :cond_1

    iput-object v0, p1, La/j/a/g;->L:Landroid/view/View;

    const/4 v1, 0x0

    invoke-virtual {v0, v1}, Landroid/view/View;->setSaveFromParentEnabled(Z)V

    iget-boolean v0, p1, La/j/a/g;->C:Z

    if-eqz v0, :cond_0

    iget-object v0, p1, La/j/a/g;->K:Landroid/view/View;

    const/16 v2, 0x8

    invoke-virtual {v0, v2}, Landroid/view/View;->setVisibility(I)V

    :cond_0
    iget-object v0, p1, La/j/a/g;->K:Landroid/view/View;

    iget-object v2, p1, La/j/a/g;->d:Landroid/os/Bundle;

    invoke-virtual {p1, v0, v2}, La/j/a/g;->a(Landroid/view/View;Landroid/os/Bundle;)V

    iget-object v0, p1, La/j/a/g;->K:Landroid/view/View;

    iget-object v2, p1, La/j/a/g;->d:Landroid/os/Bundle;

    invoke-virtual {p0, p1, v0, v2, v1}, La/j/a/t;->a(La/j/a/g;Landroid/view/View;Landroid/os/Bundle;Z)V

    goto :goto_0

    :cond_1
    iput-object v2, p1, La/j/a/g;->L:Landroid/view/View;

    :cond_2
    :goto_0
    return-void
.end method

.method d(La/j/a/g;Landroid/os/Bundle;Z)V
    .locals 3

    iget-object v0, p0, La/j/a/t;->u:La/j/a/g;

    if-eqz v0, :cond_0

    invoke-virtual {v0}, La/j/a/g;->o()La/j/a/m;

    move-result-object v0

    instance-of v1, v0, La/j/a/t;

    if-eqz v1, :cond_0

    check-cast v0, La/j/a/t;

    const/4 v1, 0x1

    invoke-virtual {v0, p1, p2, v1}, La/j/a/t;->d(La/j/a/g;Landroid/os/Bundle;Z)V

    :cond_0
    iget-object v0, p0, La/j/a/t;->q:Ljava/util/concurrent/CopyOnWriteArrayList;

    invoke-virtual {v0}, Ljava/util/concurrent/CopyOnWriteArrayList;->iterator()Ljava/util/Iterator;

    move-result-object v0

    :cond_1
    :goto_0
    invoke-interface {v0}, Ljava/util/Iterator;->hasNext()Z

    move-result v1

    if-eqz v1, :cond_3

    invoke-interface {v0}, Ljava/util/Iterator;->next()Ljava/lang/Object;

    move-result-object v1

    check-cast v1, La/j/a/t$f;

    if-eqz p3, :cond_2

    iget-boolean v2, v1, La/j/a/t$f;->b:Z

    if-eqz v2, :cond_1

    :cond_2
    iget-object v1, v1, La/j/a/t$f;->a:La/j/a/m$b;

    invoke-virtual {v1, p0, p1, p2}, La/j/a/m$b;->d(La/j/a/m;La/j/a/g;Landroid/os/Bundle;)V

    goto :goto_0

    :cond_3
    return-void
.end method

.method d(La/j/a/g;Z)V
    .locals 3

    iget-object v0, p0, La/j/a/t;->u:La/j/a/g;

    if-eqz v0, :cond_0

    invoke-virtual {v0}, La/j/a/g;->o()La/j/a/m;

    move-result-object v0

    instance-of v1, v0, La/j/a/t;

    if-eqz v1, :cond_0

    check-cast v0, La/j/a/t;

    const/4 v1, 0x1

    invoke-virtual {v0, p1, v1}, La/j/a/t;->d(La/j/a/g;Z)V

    :cond_0
    iget-object v0, p0, La/j/a/t;->q:Ljava/util/concurrent/CopyOnWriteArrayList;

    invoke-virtual {v0}, Ljava/util/concurrent/CopyOnWriteArrayList;->iterator()Ljava/util/Iterator;

    move-result-object v0

    :cond_1
    :goto_0
    invoke-interface {v0}, Ljava/util/Iterator;->hasNext()Z

    move-result v1

    if-eqz v1, :cond_3

    invoke-interface {v0}, Ljava/util/Iterator;->next()Ljava/lang/Object;

    move-result-object v1

    check-cast v1, La/j/a/t$f;

    if-eqz p2, :cond_2

    iget-boolean v2, v1, La/j/a/t$f;->b:Z

    if-eqz v2, :cond_1

    :cond_2
    iget-object v1, v1, La/j/a/t$f;->a:La/j/a/m$b;

    invoke-virtual {v1, p0, p1}, La/j/a/m$b;->c(La/j/a/m;La/j/a/g;)V

    goto :goto_0

    :cond_3
    return-void
.end method

.method public e()V
    .locals 1

    const/4 v0, 0x0

    iput-boolean v0, p0, La/j/a/t;->x:Z

    iput-boolean v0, p0, La/j/a/t;->y:Z

    const/4 v0, 0x1

    invoke-direct {p0, v0}, La/j/a/t;->e(I)V

    return-void
.end method

.method public e(La/j/a/g;)V
    .locals 2

    sget-boolean v0, La/j/a/t;->a:Z

    if-eqz v0, :cond_0

    new-instance v0, Ljava/lang/StringBuilder;

    invoke-direct {v0}, Ljava/lang/StringBuilder;-><init>()V

    const-string v1, "hide: "

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v0, p1}, Ljava/lang/StringBuilder;->append(Ljava/lang/Object;)Ljava/lang/StringBuilder;

    invoke-virtual {v0}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    const-string v1, "FragmentManager"

    invoke-static {v1, v0}, Landroid/util/Log;->v(Ljava/lang/String;Ljava/lang/String;)I

    :cond_0
    iget-boolean v0, p1, La/j/a/g;->C:Z

    if-nez v0, :cond_1

    const/4 v0, 0x1

    iput-boolean v0, p1, La/j/a/g;->C:Z

    iget-boolean v1, p1, La/j/a/g;->Q:Z

    xor-int/2addr v0, v1

    iput-boolean v0, p1, La/j/a/g;->Q:Z

    :cond_1
    return-void
.end method

.method e(La/j/a/g;Z)V
    .locals 3

    iget-object v0, p0, La/j/a/t;->u:La/j/a/g;

    if-eqz v0, :cond_0

    invoke-virtual {v0}, La/j/a/g;->o()La/j/a/m;

    move-result-object v0

    instance-of v1, v0, La/j/a/t;

    if-eqz v1, :cond_0

    check-cast v0, La/j/a/t;

    const/4 v1, 0x1

    invoke-virtual {v0, p1, v1}, La/j/a/t;->e(La/j/a/g;Z)V

    :cond_0
    iget-object v0, p0, La/j/a/t;->q:Ljava/util/concurrent/CopyOnWriteArrayList;

    invoke-virtual {v0}, Ljava/util/concurrent/CopyOnWriteArrayList;->iterator()Ljava/util/Iterator;

    move-result-object v0

    :cond_1
    :goto_0
    invoke-interface {v0}, Ljava/util/Iterator;->hasNext()Z

    move-result v1

    if-eqz v1, :cond_3

    invoke-interface {v0}, Ljava/util/Iterator;->next()Ljava/lang/Object;

    move-result-object v1

    check-cast v1, La/j/a/t$f;

    if-eqz p2, :cond_2

    iget-boolean v2, v1, La/j/a/t$f;->b:Z

    if-eqz v2, :cond_1

    :cond_2
    iget-object v1, v1, La/j/a/t$f;->a:La/j/a/m$b;

    invoke-virtual {v1, p0, p1}, La/j/a/m$b;->d(La/j/a/m;La/j/a/g;)V

    goto :goto_0

    :cond_3
    return-void
.end method

.method public f()V
    .locals 1

    const/4 v0, 0x1

    iput-boolean v0, p0, La/j/a/t;->z:Z

    invoke-virtual {p0}, La/j/a/t;->n()Z

    const/4 v0, 0x0

    invoke-direct {p0, v0}, La/j/a/t;->e(I)V

    const/4 v0, 0x0

    iput-object v0, p0, La/j/a/t;->s:La/j/a/l;

    iput-object v0, p0, La/j/a/t;->t:La/j/a/j;

    iput-object v0, p0, La/j/a/t;->u:La/j/a/g;

    return-void
.end method

.method f(La/j/a/g;)V
    .locals 2

    iget v0, p1, La/j/a/g;->g:I

    if-ltz v0, :cond_0

    return-void

    :cond_0
    iget v0, p0, La/j/a/t;->i:I

    add-int/lit8 v1, v0, 0x1

    iput v1, p0, La/j/a/t;->i:I

    iget-object v1, p0, La/j/a/t;->u:La/j/a/g;

    invoke-virtual {p1, v0, v1}, La/j/a/g;->a(ILa/j/a/g;)V

    iget-object v0, p0, La/j/a/t;->k:Landroid/util/SparseArray;

    if-nez v0, :cond_1

    new-instance v0, Landroid/util/SparseArray;

    invoke-direct {v0}, Landroid/util/SparseArray;-><init>()V

    iput-object v0, p0, La/j/a/t;->k:Landroid/util/SparseArray;

    :cond_1
    iget-object v0, p0, La/j/a/t;->k:Landroid/util/SparseArray;

    iget v1, p1, La/j/a/g;->g:I

    invoke-virtual {v0, v1, p1}, Landroid/util/SparseArray;->put(ILjava/lang/Object;)V

    sget-boolean v0, La/j/a/t;->a:Z

    if-eqz v0, :cond_2

    new-instance v0, Ljava/lang/StringBuilder;

    invoke-direct {v0}, Ljava/lang/StringBuilder;-><init>()V

    const-string v1, "Allocated fragment index "

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v0, p1}, Ljava/lang/StringBuilder;->append(Ljava/lang/Object;)Ljava/lang/StringBuilder;

    invoke-virtual {v0}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object p1

    const-string v0, "FragmentManager"

    invoke-static {v0, p1}, Landroid/util/Log;->v(Ljava/lang/String;Ljava/lang/String;)I

    :cond_2
    return-void
.end method

.method f(La/j/a/g;Z)V
    .locals 3

    iget-object v0, p0, La/j/a/t;->u:La/j/a/g;

    if-eqz v0, :cond_0

    invoke-virtual {v0}, La/j/a/g;->o()La/j/a/m;

    move-result-object v0

    instance-of v1, v0, La/j/a/t;

    if-eqz v1, :cond_0

    check-cast v0, La/j/a/t;

    const/4 v1, 0x1

    invoke-virtual {v0, p1, v1}, La/j/a/t;->f(La/j/a/g;Z)V

    :cond_0
    iget-object v0, p0, La/j/a/t;->q:Ljava/util/concurrent/CopyOnWriteArrayList;

    invoke-virtual {v0}, Ljava/util/concurrent/CopyOnWriteArrayList;->iterator()Ljava/util/Iterator;

    move-result-object v0

    :cond_1
    :goto_0
    invoke-interface {v0}, Ljava/util/Iterator;->hasNext()Z

    move-result v1

    if-eqz v1, :cond_3

    invoke-interface {v0}, Ljava/util/Iterator;->next()Ljava/lang/Object;

    move-result-object v1

    check-cast v1, La/j/a/t$f;

    if-eqz p2, :cond_2

    iget-boolean v2, v1, La/j/a/t$f;->b:Z

    if-eqz v2, :cond_1

    :cond_2
    iget-object v1, v1, La/j/a/t$f;->a:La/j/a/m$b;

    invoke-virtual {v1, p0, p1}, La/j/a/m$b;->e(La/j/a/m;La/j/a/g;)V

    goto :goto_0

    :cond_3
    return-void
.end method

.method public g()V
    .locals 1

    const/4 v0, 0x1

    invoke-direct {p0, v0}, La/j/a/t;->e(I)V

    return-void
.end method

.method g(La/j/a/g;)V
    .locals 3

    iget v0, p1, La/j/a/g;->g:I

    if-gez v0, :cond_0

    return-void

    :cond_0
    sget-boolean v0, La/j/a/t;->a:Z

    if-eqz v0, :cond_1

    new-instance v0, Ljava/lang/StringBuilder;

    invoke-direct {v0}, Ljava/lang/StringBuilder;-><init>()V

    const-string v1, "Freeing fragment index "

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v0, p1}, Ljava/lang/StringBuilder;->append(Ljava/lang/Object;)Ljava/lang/StringBuilder;

    invoke-virtual {v0}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    const-string v1, "FragmentManager"

    invoke-static {v1, v0}, Landroid/util/Log;->v(Ljava/lang/String;Ljava/lang/String;)I

    :cond_1
    iget-object v0, p0, La/j/a/t;->k:Landroid/util/SparseArray;

    iget v1, p1, La/j/a/g;->g:I

    const/4 v2, 0x0

    invoke-virtual {v0, v1, v2}, Landroid/util/SparseArray;->put(ILjava/lang/Object;)V

    invoke-virtual {p1}, La/j/a/g;->z()V

    return-void
.end method

.method g(La/j/a/g;Z)V
    .locals 3

    iget-object v0, p0, La/j/a/t;->u:La/j/a/g;

    if-eqz v0, :cond_0

    invoke-virtual {v0}, La/j/a/g;->o()La/j/a/m;

    move-result-object v0

    instance-of v1, v0, La/j/a/t;

    if-eqz v1, :cond_0

    check-cast v0, La/j/a/t;

    const/4 v1, 0x1

    invoke-virtual {v0, p1, v1}, La/j/a/t;->g(La/j/a/g;Z)V

    :cond_0
    iget-object v0, p0, La/j/a/t;->q:Ljava/util/concurrent/CopyOnWriteArrayList;

    invoke-virtual {v0}, Ljava/util/concurrent/CopyOnWriteArrayList;->iterator()Ljava/util/Iterator;

    move-result-object v0

    :cond_1
    :goto_0
    invoke-interface {v0}, Ljava/util/Iterator;->hasNext()Z

    move-result v1

    if-eqz v1, :cond_3

    invoke-interface {v0}, Ljava/util/Iterator;->next()Ljava/lang/Object;

    move-result-object v1

    check-cast v1, La/j/a/t$f;

    if-eqz p2, :cond_2

    iget-boolean v2, v1, La/j/a/t$f;->b:Z

    if-eqz v2, :cond_1

    :cond_2
    iget-object v1, v1, La/j/a/t$f;->a:La/j/a/m$b;

    invoke-virtual {v1, p0, p1}, La/j/a/m$b;->f(La/j/a/m;La/j/a/g;)V

    goto :goto_0

    :cond_3
    return-void
.end method

.method public h()V
    .locals 2

    const/4 v0, 0x0

    :goto_0
    iget-object v1, p0, La/j/a/t;->j:Ljava/util/ArrayList;

    invoke-virtual {v1}, Ljava/util/ArrayList;->size()I

    move-result v1

    if-ge v0, v1, :cond_1

    iget-object v1, p0, La/j/a/t;->j:Ljava/util/ArrayList;

    invoke-virtual {v1, v0}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v1

    check-cast v1, La/j/a/g;

    if-eqz v1, :cond_0

    invoke-virtual {v1}, La/j/a/g;->S()V

    :cond_0
    add-int/lit8 v0, v0, 0x1

    goto :goto_0

    :cond_1
    return-void
.end method

.method h(La/j/a/g;)V
    .locals 10

    if-nez p1, :cond_0

    return-void

    :cond_0
    iget v0, p0, La/j/a/t;->r:I

    iget-boolean v1, p1, La/j/a/g;->n:Z

    const/4 v2, 0x1

    const/4 v3, 0x0

    if-eqz v1, :cond_2

    invoke-virtual {p1}, La/j/a/g;->C()Z

    move-result v1

    if-eqz v1, :cond_1

    invoke-static {v0, v2}, Ljava/lang/Math;->min(II)I

    move-result v0

    goto :goto_0

    :cond_1
    invoke-static {v0, v3}, Ljava/lang/Math;->min(II)I

    move-result v0

    :cond_2
    :goto_0
    move v6, v0

    invoke-virtual {p1}, La/j/a/g;->q()I

    move-result v7

    invoke-virtual {p1}, La/j/a/g;->r()I

    move-result v8

    const/4 v9, 0x0

    move-object v4, p0

    move-object v5, p1

    invoke-virtual/range {v4 .. v9}, La/j/a/t;->a(La/j/a/g;IIIZ)V

    iget-object v0, p1, La/j/a/g;->K:Landroid/view/View;

    if-eqz v0, :cond_6

    invoke-direct {p0, p1}, La/j/a/t;->p(La/j/a/g;)La/j/a/g;

    move-result-object v0

    if-eqz v0, :cond_3

    iget-object v0, v0, La/j/a/g;->K:Landroid/view/View;

    iget-object v1, p1, La/j/a/g;->J:Landroid/view/ViewGroup;

    invoke-virtual {v1, v0}, Landroid/view/ViewGroup;->indexOfChild(Landroid/view/View;)I

    move-result v0

    iget-object v4, p1, La/j/a/g;->K:Landroid/view/View;

    invoke-virtual {v1, v4}, Landroid/view/ViewGroup;->indexOfChild(Landroid/view/View;)I

    move-result v4

    if-ge v4, v0, :cond_3

    invoke-virtual {v1, v4}, Landroid/view/ViewGroup;->removeViewAt(I)V

    iget-object v4, p1, La/j/a/g;->K:Landroid/view/View;

    invoke-virtual {v1, v4, v0}, Landroid/view/ViewGroup;->addView(Landroid/view/View;I)V

    :cond_3
    iget-boolean v0, p1, La/j/a/g;->P:Z

    if-eqz v0, :cond_6

    iget-object v0, p1, La/j/a/g;->J:Landroid/view/ViewGroup;

    if-eqz v0, :cond_6

    iget v0, p1, La/j/a/g;->R:F

    const/4 v1, 0x0

    cmpl-float v4, v0, v1

    if-lez v4, :cond_4

    iget-object v4, p1, La/j/a/g;->K:Landroid/view/View;

    invoke-virtual {v4, v0}, Landroid/view/View;->setAlpha(F)V

    :cond_4
    iput v1, p1, La/j/a/g;->R:F

    iput-boolean v3, p1, La/j/a/g;->P:Z

    invoke-virtual {p1}, La/j/a/g;->q()I

    move-result v0

    invoke-virtual {p1}, La/j/a/g;->r()I

    move-result v1

    invoke-virtual {p0, p1, v0, v2, v1}, La/j/a/t;->a(La/j/a/g;IZI)La/j/a/t$c;

    move-result-object v0

    if-eqz v0, :cond_6

    iget-object v1, p1, La/j/a/g;->K:Landroid/view/View;

    invoke-static {v1, v0}, La/j/a/t;->b(Landroid/view/View;La/j/a/t$c;)V

    iget-object v1, v0, La/j/a/t$c;->a:Landroid/view/animation/Animation;

    if-eqz v1, :cond_5

    iget-object v0, p1, La/j/a/g;->K:Landroid/view/View;

    invoke-virtual {v0, v1}, Landroid/view/View;->startAnimation(Landroid/view/animation/Animation;)V

    goto :goto_1

    :cond_5
    iget-object v1, v0, La/j/a/t$c;->b:Landroid/animation/Animator;

    iget-object v2, p1, La/j/a/g;->K:Landroid/view/View;

    invoke-virtual {v1, v2}, Landroid/animation/Animator;->setTarget(Ljava/lang/Object;)V

    iget-object v0, v0, La/j/a/t$c;->b:Landroid/animation/Animator;

    invoke-virtual {v0}, Landroid/animation/Animator;->start()V

    :cond_6
    :goto_1
    iget-boolean v0, p1, La/j/a/g;->Q:Z

    if-eqz v0, :cond_7

    invoke-virtual {p0, p1}, La/j/a/t;->b(La/j/a/g;)V

    :cond_7
    return-void
.end method

.method h(La/j/a/g;Z)V
    .locals 3

    iget-object v0, p0, La/j/a/t;->u:La/j/a/g;

    if-eqz v0, :cond_0

    invoke-virtual {v0}, La/j/a/g;->o()La/j/a/m;

    move-result-object v0

    instance-of v1, v0, La/j/a/t;

    if-eqz v1, :cond_0

    check-cast v0, La/j/a/t;

    const/4 v1, 0x1

    invoke-virtual {v0, p1, v1}, La/j/a/t;->h(La/j/a/g;Z)V

    :cond_0
    iget-object v0, p0, La/j/a/t;->q:Ljava/util/concurrent/CopyOnWriteArrayList;

    invoke-virtual {v0}, Ljava/util/concurrent/CopyOnWriteArrayList;->iterator()Ljava/util/Iterator;

    move-result-object v0

    :cond_1
    :goto_0
    invoke-interface {v0}, Ljava/util/Iterator;->hasNext()Z

    move-result v1

    if-eqz v1, :cond_3

    invoke-interface {v0}, Ljava/util/Iterator;->next()Ljava/lang/Object;

    move-result-object v1

    check-cast v1, La/j/a/t$f;

    if-eqz p2, :cond_2

    iget-boolean v2, v1, La/j/a/t$f;->b:Z

    if-eqz v2, :cond_1

    :cond_2
    iget-object v1, v1, La/j/a/t$f;->a:La/j/a/m$b;

    invoke-virtual {v1, p0, p1}, La/j/a/m$b;->g(La/j/a/m;La/j/a/g;)V

    goto :goto_0

    :cond_3
    return-void
.end method

.method public i()V
    .locals 1

    const/4 v0, 0x3

    invoke-direct {p0, v0}, La/j/a/t;->e(I)V

    return-void
.end method

.method i(La/j/a/g;)V
    .locals 6

    iget v2, p0, La/j/a/t;->r:I

    const/4 v3, 0x0

    const/4 v4, 0x0

    const/4 v5, 0x0

    move-object v0, p0

    move-object v1, p1

    invoke-virtual/range {v0 .. v5}, La/j/a/t;->a(La/j/a/g;IIIZ)V

    return-void
.end method

.method public j()V
    .locals 1

    const/4 v0, 0x0

    iput-boolean v0, p0, La/j/a/t;->x:Z

    iput-boolean v0, p0, La/j/a/t;->y:Z

    const/4 v0, 0x4

    invoke-direct {p0, v0}, La/j/a/t;->e(I)V

    return-void
.end method

.method public j(La/j/a/g;)V
    .locals 7

    iget-boolean v0, p1, La/j/a/g;->M:Z

    if-eqz v0, :cond_1

    iget-boolean v0, p0, La/j/a/t;->h:Z

    if-eqz v0, :cond_0

    const/4 p1, 0x1

    iput-boolean p1, p0, La/j/a/t;->B:Z

    return-void

    :cond_0
    const/4 v0, 0x0

    iput-boolean v0, p1, La/j/a/g;->M:Z

    iget v3, p0, La/j/a/t;->r:I

    const/4 v4, 0x0

    const/4 v5, 0x0

    const/4 v6, 0x0

    move-object v1, p0

    move-object v2, p1

    invoke-virtual/range {v1 .. v6}, La/j/a/t;->a(La/j/a/g;IIIZ)V

    :cond_1
    return-void
.end method

.method public k()V
    .locals 1

    const/4 v0, 0x0

    iput-boolean v0, p0, La/j/a/t;->x:Z

    iput-boolean v0, p0, La/j/a/t;->y:Z

    const/4 v0, 0x3

    invoke-direct {p0, v0}, La/j/a/t;->e(I)V

    return-void
.end method

.method public k(La/j/a/g;)V
    .locals 3

    sget-boolean v0, La/j/a/t;->a:Z

    if-eqz v0, :cond_0

    new-instance v0, Ljava/lang/StringBuilder;

    invoke-direct {v0}, Ljava/lang/StringBuilder;-><init>()V

    const-string v1, "remove: "

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v0, p1}, Ljava/lang/StringBuilder;->append(Ljava/lang/Object;)Ljava/lang/StringBuilder;

    const-string v1, " nesting="

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    iget v1, p1, La/j/a/g;->s:I

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(I)Ljava/lang/StringBuilder;

    invoke-virtual {v0}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    const-string v1, "FragmentManager"

    invoke-static {v1, v0}, Landroid/util/Log;->v(Ljava/lang/String;Ljava/lang/String;)I

    :cond_0
    invoke-virtual {p1}, La/j/a/g;->C()Z

    move-result v0

    const/4 v1, 0x1

    xor-int/2addr v0, v1

    iget-boolean v2, p1, La/j/a/g;->D:Z

    if-eqz v2, :cond_1

    if-eqz v0, :cond_3

    :cond_1
    iget-object v0, p0, La/j/a/t;->j:Ljava/util/ArrayList;

    monitor-enter v0

    :try_start_0
    iget-object v2, p0, La/j/a/t;->j:Ljava/util/ArrayList;

    invoke-virtual {v2, p1}, Ljava/util/ArrayList;->remove(Ljava/lang/Object;)Z

    monitor-exit v0
    :try_end_0
    .catchall {:try_start_0 .. :try_end_0} :catchall_0

    iget-boolean v0, p1, La/j/a/g;->G:Z

    if-eqz v0, :cond_2

    iget-boolean v0, p1, La/j/a/g;->H:Z

    if-eqz v0, :cond_2

    iput-boolean v1, p0, La/j/a/t;->w:Z

    :cond_2
    const/4 v0, 0x0

    iput-boolean v0, p1, La/j/a/g;->m:Z

    iput-boolean v1, p1, La/j/a/g;->n:Z

    :cond_3
    return-void

    :catchall_0
    move-exception p1

    :try_start_1
    monitor-exit v0
    :try_end_1
    .catchall {:try_start_1 .. :try_end_1} :catchall_0

    throw p1
.end method

.method l(La/j/a/g;)Landroid/os/Bundle;
    .locals 3

    iget-object v0, p0, La/j/a/t;->F:Landroid/os/Bundle;

    if-nez v0, :cond_0

    new-instance v0, Landroid/os/Bundle;

    invoke-direct {v0}, Landroid/os/Bundle;-><init>()V

    iput-object v0, p0, La/j/a/t;->F:Landroid/os/Bundle;

    :cond_0
    iget-object v0, p0, La/j/a/t;->F:Landroid/os/Bundle;

    invoke-virtual {p1, v0}, La/j/a/g;->j(Landroid/os/Bundle;)V

    iget-object v0, p0, La/j/a/t;->F:Landroid/os/Bundle;

    const/4 v1, 0x0

    invoke-virtual {p0, p1, v0, v1}, La/j/a/t;->d(La/j/a/g;Landroid/os/Bundle;Z)V

    iget-object v0, p0, La/j/a/t;->F:Landroid/os/Bundle;

    invoke-virtual {v0}, Landroid/os/Bundle;->isEmpty()Z

    move-result v0

    const/4 v1, 0x0

    if-nez v0, :cond_1

    iget-object v0, p0, La/j/a/t;->F:Landroid/os/Bundle;

    iput-object v1, p0, La/j/a/t;->F:Landroid/os/Bundle;

    goto :goto_0

    :cond_1
    move-object v0, v1

    :goto_0
    iget-object v1, p1, La/j/a/g;->K:Landroid/view/View;

    if-eqz v1, :cond_2

    invoke-virtual {p0, p1}, La/j/a/t;->m(La/j/a/g;)V

    :cond_2
    iget-object v1, p1, La/j/a/g;->e:Landroid/util/SparseArray;

    if-eqz v1, :cond_4

    if-nez v0, :cond_3

    new-instance v0, Landroid/os/Bundle;

    invoke-direct {v0}, Landroid/os/Bundle;-><init>()V

    :cond_3
    iget-object v1, p1, La/j/a/g;->e:Landroid/util/SparseArray;

    const-string v2, "android:view_state"

    invoke-virtual {v0, v2, v1}, Landroid/os/Bundle;->putSparseParcelableArray(Ljava/lang/String;Landroid/util/SparseArray;)V

    :cond_4
    iget-boolean v1, p1, La/j/a/g;->N:Z

    if-nez v1, :cond_6

    if-nez v0, :cond_5

    new-instance v0, Landroid/os/Bundle;

    invoke-direct {v0}, Landroid/os/Bundle;-><init>()V

    :cond_5
    iget-boolean p1, p1, La/j/a/g;->N:Z

    const-string v1, "android:user_visible_hint"

    invoke-virtual {v0, v1, p1}, Landroid/os/Bundle;->putBoolean(Ljava/lang/String;Z)V

    :cond_6
    return-object v0
.end method

.method public l()V
    .locals 1

    const/4 v0, 0x1

    iput-boolean v0, p0, La/j/a/t;->y:Z

    const/4 v0, 0x2

    invoke-direct {p0, v0}, La/j/a/t;->e(I)V

    return-void
.end method

.method m()V
    .locals 1

    iget-boolean v0, p0, La/j/a/t;->B:Z

    if-eqz v0, :cond_0

    const/4 v0, 0x0

    iput-boolean v0, p0, La/j/a/t;->B:Z

    invoke-virtual {p0}, La/j/a/t;->w()V

    :cond_0
    return-void
.end method

.method m(La/j/a/g;)V
    .locals 2

    iget-object v0, p1, La/j/a/g;->L:Landroid/view/View;

    if-nez v0, :cond_0

    return-void

    :cond_0
    iget-object v0, p0, La/j/a/t;->G:Landroid/util/SparseArray;

    if-nez v0, :cond_1

    new-instance v0, Landroid/util/SparseArray;

    invoke-direct {v0}, Landroid/util/SparseArray;-><init>()V

    iput-object v0, p0, La/j/a/t;->G:Landroid/util/SparseArray;

    goto :goto_0

    :cond_1
    invoke-virtual {v0}, Landroid/util/SparseArray;->clear()V

    :goto_0
    iget-object v0, p1, La/j/a/g;->L:Landroid/view/View;

    iget-object v1, p0, La/j/a/t;->G:Landroid/util/SparseArray;

    invoke-virtual {v0, v1}, Landroid/view/View;->saveHierarchyState(Landroid/util/SparseArray;)V

    iget-object v0, p0, La/j/a/t;->G:Landroid/util/SparseArray;

    invoke-virtual {v0}, Landroid/util/SparseArray;->size()I

    move-result v0

    if-lez v0, :cond_2

    iget-object v0, p0, La/j/a/t;->G:Landroid/util/SparseArray;

    iput-object v0, p1, La/j/a/g;->e:Landroid/util/SparseArray;

    const/4 p1, 0x0

    iput-object p1, p0, La/j/a/t;->G:Landroid/util/SparseArray;

    :cond_2
    return-void
.end method

.method public n(La/j/a/g;)V
    .locals 3

    if-eqz p1, :cond_1

    iget-object v0, p0, La/j/a/t;->k:Landroid/util/SparseArray;

    iget v1, p1, La/j/a/g;->g:I

    invoke-virtual {v0, v1}, Landroid/util/SparseArray;->get(I)Ljava/lang/Object;

    move-result-object v0

    if-ne v0, p1, :cond_0

    iget-object v0, p1, La/j/a/g;->u:La/j/a/l;

    if-eqz v0, :cond_1

    invoke-virtual {p1}, La/j/a/g;->o()La/j/a/m;

    move-result-object v0

    if-ne v0, p0, :cond_0

    goto :goto_0

    :cond_0
    new-instance v0, Ljava/lang/IllegalArgumentException;

    new-instance v1, Ljava/lang/StringBuilder;

    invoke-direct {v1}, Ljava/lang/StringBuilder;-><init>()V

    const-string v2, "Fragment "

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v1, p1}, Ljava/lang/StringBuilder;->append(Ljava/lang/Object;)Ljava/lang/StringBuilder;

    const-string p1, " is not an active fragment of FragmentManager "

    invoke-virtual {v1, p1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v1, p0}, Ljava/lang/StringBuilder;->append(Ljava/lang/Object;)Ljava/lang/StringBuilder;

    invoke-virtual {v1}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object p1

    invoke-direct {v0, p1}, Ljava/lang/IllegalArgumentException;-><init>(Ljava/lang/String;)V

    throw v0

    :cond_1
    :goto_0
    iput-object p1, p0, La/j/a/t;->v:La/j/a/g;

    return-void
.end method

.method public n()Z
    .locals 4

    const/4 v0, 0x1

    invoke-direct {p0, v0}, La/j/a/t;->c(Z)V

    const/4 v1, 0x0

    :goto_0
    iget-object v2, p0, La/j/a/t;->C:Ljava/util/ArrayList;

    iget-object v3, p0, La/j/a/t;->D:Ljava/util/ArrayList;

    invoke-direct {p0, v2, v3}, La/j/a/t;->b(Ljava/util/ArrayList;Ljava/util/ArrayList;)Z

    move-result v2

    if-eqz v2, :cond_0

    iput-boolean v0, p0, La/j/a/t;->h:Z

    :try_start_0
    iget-object v1, p0, La/j/a/t;->C:Ljava/util/ArrayList;

    iget-object v2, p0, La/j/a/t;->D:Ljava/util/ArrayList;

    invoke-direct {p0, v1, v2}, La/j/a/t;->c(Ljava/util/ArrayList;Ljava/util/ArrayList;)V
    :try_end_0
    .catchall {:try_start_0 .. :try_end_0} :catchall_0

    invoke-direct {p0}, La/j/a/t;->z()V

    move v1, v0

    goto :goto_0

    :catchall_0
    move-exception v0

    invoke-direct {p0}, La/j/a/t;->z()V

    throw v0

    :cond_0
    invoke-virtual {p0}, La/j/a/t;->m()V

    invoke-direct {p0}, La/j/a/t;->x()V

    return v1
.end method

.method o()Landroid/view/LayoutInflater$Factory2;
    .locals 0

    return-object p0
.end method

.method public o(La/j/a/g;)V
    .locals 2

    sget-boolean v0, La/j/a/t;->a:Z

    if-eqz v0, :cond_0

    new-instance v0, Ljava/lang/StringBuilder;

    invoke-direct {v0}, Ljava/lang/StringBuilder;-><init>()V

    const-string v1, "show: "

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v0, p1}, Ljava/lang/StringBuilder;->append(Ljava/lang/Object;)Ljava/lang/StringBuilder;

    invoke-virtual {v0}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    const-string v1, "FragmentManager"

    invoke-static {v1, v0}, Landroid/util/Log;->v(Ljava/lang/String;Ljava/lang/String;)I

    :cond_0
    iget-boolean v0, p1, La/j/a/g;->C:Z

    if-eqz v0, :cond_1

    const/4 v0, 0x0

    iput-boolean v0, p1, La/j/a/g;->C:Z

    iget-boolean v0, p1, La/j/a/g;->Q:Z

    xor-int/lit8 v0, v0, 0x1

    iput-boolean v0, p1, La/j/a/g;->Q:Z

    :cond_1
    return-void
.end method

.method public onCreateView(Landroid/view/View;Ljava/lang/String;Landroid/content/Context;Landroid/util/AttributeSet;)Landroid/view/View;
    .locals 12

    move-object v6, p0

    move-object v0, p3

    move-object/from16 v1, p4

    const-string v2, "fragment"

    move-object v3, p2

    invoke-virtual {v2, p2}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v2

    const/4 v3, 0x0

    if-nez v2, :cond_0

    return-object v3

    :cond_0
    const-string v2, "class"

    invoke-interface {v1, v3, v2}, Landroid/util/AttributeSet;->getAttributeValue(Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;

    move-result-object v2

    sget-object v4, La/j/a/t$g;->a:[I

    invoke-virtual {p3, v1, v4}, Landroid/content/Context;->obtainStyledAttributes(Landroid/util/AttributeSet;[I)Landroid/content/res/TypedArray;

    move-result-object v4

    const/4 v5, 0x0

    if-nez v2, :cond_1

    invoke-virtual {v4, v5}, Landroid/content/res/TypedArray;->getString(I)Ljava/lang/String;

    move-result-object v2

    :cond_1
    move-object v7, v2

    const/4 v2, -0x1

    const/4 v8, 0x1

    invoke-virtual {v4, v8, v2}, Landroid/content/res/TypedArray;->getResourceId(II)I

    move-result v9

    const/4 v10, 0x2

    invoke-virtual {v4, v10}, Landroid/content/res/TypedArray;->getString(I)Ljava/lang/String;

    move-result-object v10

    invoke-virtual {v4}, Landroid/content/res/TypedArray;->recycle()V

    iget-object v4, v6, La/j/a/t;->s:La/j/a/l;

    invoke-virtual {v4}, La/j/a/l;->c()Landroid/content/Context;

    move-result-object v4

    invoke-static {v4, v7}, La/j/a/g;->a(Landroid/content/Context;Ljava/lang/String;)Z

    move-result v4

    if-nez v4, :cond_2

    return-object v3

    :cond_2
    if-eqz p1, :cond_3

    invoke-virtual {p1}, Landroid/view/View;->getId()I

    move-result v5

    :cond_3
    if-ne v5, v2, :cond_5

    if-ne v9, v2, :cond_5

    if-eqz v10, :cond_4

    goto :goto_0

    :cond_4
    new-instance v0, Ljava/lang/IllegalArgumentException;

    new-instance v2, Ljava/lang/StringBuilder;

    invoke-direct {v2}, Ljava/lang/StringBuilder;-><init>()V

    invoke-interface/range {p4 .. p4}, Landroid/util/AttributeSet;->getPositionDescription()Ljava/lang/String;

    move-result-object v1

    invoke-virtual {v2, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    const-string v1, ": Must specify unique android:id, android:tag, or have a parent with an id for "

    invoke-virtual {v2, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v2, v7}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v2}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v1

    invoke-direct {v0, v1}, Ljava/lang/IllegalArgumentException;-><init>(Ljava/lang/String;)V

    throw v0

    :cond_5
    :goto_0
    if-eq v9, v2, :cond_6

    invoke-virtual {p0, v9}, La/j/a/t;->a(I)La/j/a/g;

    move-result-object v4

    goto :goto_1

    :cond_6
    move-object v4, v3

    :goto_1
    if-nez v4, :cond_7

    if-eqz v10, :cond_7

    invoke-virtual {p0, v10}, La/j/a/t;->a(Ljava/lang/String;)La/j/a/g;

    move-result-object v4

    :cond_7
    if-nez v4, :cond_8

    if-eq v5, v2, :cond_8

    invoke-virtual {p0, v5}, La/j/a/t;->a(I)La/j/a/g;

    move-result-object v4

    :cond_8
    sget-boolean v2, La/j/a/t;->a:Z

    if-eqz v2, :cond_9

    new-instance v2, Ljava/lang/StringBuilder;

    invoke-direct {v2}, Ljava/lang/StringBuilder;-><init>()V

    const-string v11, "onCreateView: id=0x"

    invoke-virtual {v2, v11}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-static {v9}, Ljava/lang/Integer;->toHexString(I)Ljava/lang/String;

    move-result-object v11

    invoke-virtual {v2, v11}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    const-string v11, " fname="

    invoke-virtual {v2, v11}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v2, v7}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    const-string v11, " existing="

    invoke-virtual {v2, v11}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v2, v4}, Ljava/lang/StringBuilder;->append(Ljava/lang/Object;)Ljava/lang/StringBuilder;

    invoke-virtual {v2}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v2

    const-string v11, "FragmentManager"

    invoke-static {v11, v2}, Landroid/util/Log;->v(Ljava/lang/String;Ljava/lang/String;)I

    :cond_9
    if-nez v4, :cond_b

    iget-object v2, v6, La/j/a/t;->t:La/j/a/j;

    invoke-virtual {v2, p3, v7, v3}, La/j/a/j;->a(Landroid/content/Context;Ljava/lang/String;Landroid/os/Bundle;)La/j/a/g;

    move-result-object v0

    iput-boolean v8, v0, La/j/a/g;->o:Z

    if-eqz v9, :cond_a

    move v2, v9

    goto :goto_2

    :cond_a
    move v2, v5

    :goto_2
    iput v2, v0, La/j/a/g;->z:I

    iput v5, v0, La/j/a/g;->A:I

    iput-object v10, v0, La/j/a/g;->B:Ljava/lang/String;

    iput-boolean v8, v0, La/j/a/g;->p:Z

    iput-object v6, v0, La/j/a/g;->t:La/j/a/t;

    iget-object v2, v6, La/j/a/t;->s:La/j/a/l;

    iput-object v2, v0, La/j/a/g;->u:La/j/a/l;

    invoke-virtual {v2}, La/j/a/l;->c()Landroid/content/Context;

    move-result-object v2

    iget-object v3, v0, La/j/a/g;->d:Landroid/os/Bundle;

    invoke-virtual {v0, v2, v1, v3}, La/j/a/g;->a(Landroid/content/Context;Landroid/util/AttributeSet;Landroid/os/Bundle;)V

    invoke-virtual {p0, v0, v8}, La/j/a/t;->a(La/j/a/g;Z)V

    move-object v11, v0

    goto :goto_3

    :cond_b
    iget-boolean v0, v4, La/j/a/g;->p:Z

    if-nez v0, :cond_11

    iput-boolean v8, v4, La/j/a/g;->p:Z

    iget-object v0, v6, La/j/a/t;->s:La/j/a/l;

    iput-object v0, v4, La/j/a/g;->u:La/j/a/l;

    iget-boolean v2, v4, La/j/a/g;->F:Z

    if-nez v2, :cond_c

    invoke-virtual {v0}, La/j/a/l;->c()Landroid/content/Context;

    move-result-object v0

    iget-object v2, v4, La/j/a/g;->d:Landroid/os/Bundle;

    invoke-virtual {v4, v0, v1, v2}, La/j/a/g;->a(Landroid/content/Context;Landroid/util/AttributeSet;Landroid/os/Bundle;)V

    :cond_c
    move-object v11, v4

    :goto_3
    iget v0, v6, La/j/a/t;->r:I

    if-ge v0, v8, :cond_d

    iget-boolean v0, v11, La/j/a/g;->o:Z

    if-eqz v0, :cond_d

    const/4 v2, 0x1

    const/4 v3, 0x0

    const/4 v4, 0x0

    const/4 v5, 0x0

    move-object v0, p0

    move-object v1, v11

    invoke-virtual/range {v0 .. v5}, La/j/a/t;->a(La/j/a/g;IIIZ)V

    goto :goto_4

    :cond_d
    invoke-virtual {p0, v11}, La/j/a/t;->i(La/j/a/g;)V

    :goto_4
    iget-object v0, v11, La/j/a/g;->K:Landroid/view/View;

    if-eqz v0, :cond_10

    if-eqz v9, :cond_e

    invoke-virtual {v0, v9}, Landroid/view/View;->setId(I)V

    :cond_e
    iget-object v0, v11, La/j/a/g;->K:Landroid/view/View;

    invoke-virtual {v0}, Landroid/view/View;->getTag()Ljava/lang/Object;

    move-result-object v0

    if-nez v0, :cond_f

    iget-object v0, v11, La/j/a/g;->K:Landroid/view/View;

    invoke-virtual {v0, v10}, Landroid/view/View;->setTag(Ljava/lang/Object;)V

    :cond_f
    iget-object v0, v11, La/j/a/g;->K:Landroid/view/View;

    return-object v0

    :cond_10
    new-instance v0, Ljava/lang/IllegalStateException;

    new-instance v1, Ljava/lang/StringBuilder;

    invoke-direct {v1}, Ljava/lang/StringBuilder;-><init>()V

    const-string v2, "Fragment "

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v1, v7}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    const-string v2, " did not create a view."

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v1}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v1

    invoke-direct {v0, v1}, Ljava/lang/IllegalStateException;-><init>(Ljava/lang/String;)V

    throw v0

    :cond_11
    new-instance v0, Ljava/lang/IllegalArgumentException;

    new-instance v2, Ljava/lang/StringBuilder;

    invoke-direct {v2}, Ljava/lang/StringBuilder;-><init>()V

    invoke-interface/range {p4 .. p4}, Landroid/util/AttributeSet;->getPositionDescription()Ljava/lang/String;

    move-result-object v1

    invoke-virtual {v2, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    const-string v1, ": Duplicate id 0x"

    invoke-virtual {v2, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-static {v9}, Ljava/lang/Integer;->toHexString(I)Ljava/lang/String;

    move-result-object v1

    invoke-virtual {v2, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    const-string v1, ", tag "

    invoke-virtual {v2, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v2, v10}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    const-string v1, ", or parent id 0x"

    invoke-virtual {v2, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-static {v5}, Ljava/lang/Integer;->toHexString(I)Ljava/lang/String;

    move-result-object v1

    invoke-virtual {v2, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    const-string v1, " with another fragment for "

    invoke-virtual {v2, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v2, v7}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v2}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v1

    invoke-direct {v0, v1}, Ljava/lang/IllegalArgumentException;-><init>(Ljava/lang/String;)V

    throw v0
.end method

.method public onCreateView(Ljava/lang/String;Landroid/content/Context;Landroid/util/AttributeSet;)Landroid/view/View;
    .locals 1

    const/4 v0, 0x0

    invoke-virtual {p0, v0, p1, p2, p3}, La/j/a/t;->onCreateView(Landroid/view/View;Ljava/lang/String;Landroid/content/Context;Landroid/util/AttributeSet;)Landroid/view/View;

    move-result-object p1

    return-object p1
.end method

.method public p()La/j/a/g;
    .locals 1

    iget-object v0, p0, La/j/a/t;->v:La/j/a/g;

    return-object v0
.end method

.method public q()V
    .locals 3

    const/4 v0, 0x0

    iput-object v0, p0, La/j/a/t;->I:La/j/a/u;

    const/4 v0, 0x0

    iput-boolean v0, p0, La/j/a/t;->x:Z

    iput-boolean v0, p0, La/j/a/t;->y:Z

    iget-object v1, p0, La/j/a/t;->j:Ljava/util/ArrayList;

    invoke-virtual {v1}, Ljava/util/ArrayList;->size()I

    move-result v1

    :goto_0
    if-ge v0, v1, :cond_1

    iget-object v2, p0, La/j/a/t;->j:Ljava/util/ArrayList;

    invoke-virtual {v2, v0}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v2

    check-cast v2, La/j/a/g;

    if-eqz v2, :cond_0

    invoke-virtual {v2}, La/j/a/g;->F()V

    :cond_0
    add-int/lit8 v0, v0, 0x1

    goto :goto_0

    :cond_1
    return-void
.end method

.method r()V
    .locals 2

    iget-object v0, p0, La/j/a/t;->p:Ljava/util/ArrayList;

    if-eqz v0, :cond_0

    const/4 v0, 0x0

    :goto_0
    iget-object v1, p0, La/j/a/t;->p:Ljava/util/ArrayList;

    invoke-virtual {v1}, Ljava/util/ArrayList;->size()I

    move-result v1

    if-ge v0, v1, :cond_0

    iget-object v1, p0, La/j/a/t;->p:Ljava/util/ArrayList;

    invoke-virtual {v1, v0}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v1

    check-cast v1, La/j/a/m$c;

    invoke-interface {v1}, La/j/a/m$c;->onBackStackChanged()V

    add-int/lit8 v0, v0, 0x1

    goto :goto_0

    :cond_0
    return-void
.end method

.method s()La/j/a/u;
    .locals 1

    iget-object v0, p0, La/j/a/t;->I:La/j/a/u;

    invoke-static {v0}, La/j/a/t;->a(La/j/a/u;)V

    iget-object v0, p0, La/j/a/t;->I:La/j/a/u;

    return-object v0
.end method

.method t()Landroid/os/Parcelable;
    .locals 13

    invoke-direct {p0}, La/j/a/t;->B()V

    invoke-direct {p0}, La/j/a/t;->A()V

    invoke-virtual {p0}, La/j/a/t;->n()Z

    const/4 v0, 0x1

    iput-boolean v0, p0, La/j/a/t;->x:Z

    const/4 v1, 0x0

    iput-object v1, p0, La/j/a/t;->I:La/j/a/u;

    iget-object v2, p0, La/j/a/t;->k:Landroid/util/SparseArray;

    if-eqz v2, :cond_12

    invoke-virtual {v2}, Landroid/util/SparseArray;->size()I

    move-result v2

    if-gtz v2, :cond_0

    goto/16 :goto_5

    :cond_0
    iget-object v2, p0, La/j/a/t;->k:Landroid/util/SparseArray;

    invoke-virtual {v2}, Landroid/util/SparseArray;->size()I

    move-result v2

    new-array v3, v2, [La/j/a/y;

    const/4 v4, 0x0

    move v5, v4

    move v6, v5

    :goto_0
    const-string v7, " has cleared index: "

    const-string v8, "Failure saving state: active "

    const-string v9, ": "

    const-string v10, "FragmentManager"

    if-ge v5, v2, :cond_8

    iget-object v11, p0, La/j/a/t;->k:Landroid/util/SparseArray;

    invoke-virtual {v11, v5}, Landroid/util/SparseArray;->valueAt(I)Ljava/lang/Object;

    move-result-object v11

    check-cast v11, La/j/a/g;

    if-eqz v11, :cond_7

    iget v6, v11, La/j/a/g;->g:I

    if-ltz v6, :cond_6

    new-instance v6, La/j/a/y;

    invoke-direct {v6, v11}, La/j/a/y;-><init>(La/j/a/g;)V

    aput-object v6, v3, v5

    iget v7, v11, La/j/a/g;->c:I

    if-lez v7, :cond_3

    iget-object v7, v6, La/j/a/y;->k:Landroid/os/Bundle;

    if-nez v7, :cond_3

    invoke-virtual {p0, v11}, La/j/a/t;->l(La/j/a/g;)Landroid/os/Bundle;

    move-result-object v7

    iput-object v7, v6, La/j/a/y;->k:Landroid/os/Bundle;

    iget-object v7, v11, La/j/a/g;->j:La/j/a/g;

    if-eqz v7, :cond_4

    iget v7, v7, La/j/a/g;->g:I

    if-ltz v7, :cond_2

    iget-object v7, v6, La/j/a/y;->k:Landroid/os/Bundle;

    if-nez v7, :cond_1

    new-instance v7, Landroid/os/Bundle;

    invoke-direct {v7}, Landroid/os/Bundle;-><init>()V

    iput-object v7, v6, La/j/a/y;->k:Landroid/os/Bundle;

    :cond_1
    iget-object v7, v6, La/j/a/y;->k:Landroid/os/Bundle;

    iget-object v8, v11, La/j/a/g;->j:La/j/a/g;

    const-string v12, "android:target_state"

    invoke-virtual {p0, v7, v12, v8}, La/j/a/t;->a(Landroid/os/Bundle;Ljava/lang/String;La/j/a/g;)V

    iget v7, v11, La/j/a/g;->l:I

    if-eqz v7, :cond_4

    iget-object v8, v6, La/j/a/y;->k:Landroid/os/Bundle;

    const-string v12, "android:target_req_state"

    invoke-virtual {v8, v12, v7}, Landroid/os/Bundle;->putInt(Ljava/lang/String;I)V

    goto :goto_1

    :cond_2
    new-instance v0, Ljava/lang/IllegalStateException;

    new-instance v2, Ljava/lang/StringBuilder;

    invoke-direct {v2}, Ljava/lang/StringBuilder;-><init>()V

    const-string v3, "Failure saving state: "

    invoke-virtual {v2, v3}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v2, v11}, Ljava/lang/StringBuilder;->append(Ljava/lang/Object;)Ljava/lang/StringBuilder;

    const-string v3, " has target not in fragment manager: "

    invoke-virtual {v2, v3}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    iget-object v3, v11, La/j/a/g;->j:La/j/a/g;

    invoke-virtual {v2, v3}, Ljava/lang/StringBuilder;->append(Ljava/lang/Object;)Ljava/lang/StringBuilder;

    invoke-virtual {v2}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v2

    invoke-direct {v0, v2}, Ljava/lang/IllegalStateException;-><init>(Ljava/lang/String;)V

    invoke-direct {p0, v0}, La/j/a/t;->a(Ljava/lang/RuntimeException;)V

    throw v1

    :cond_3
    iget-object v7, v11, La/j/a/g;->d:Landroid/os/Bundle;

    iput-object v7, v6, La/j/a/y;->k:Landroid/os/Bundle;

    :cond_4
    :goto_1
    sget-boolean v7, La/j/a/t;->a:Z

    if-eqz v7, :cond_5

    new-instance v7, Ljava/lang/StringBuilder;

    invoke-direct {v7}, Ljava/lang/StringBuilder;-><init>()V

    const-string v8, "Saved state of "

    invoke-virtual {v7, v8}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v7, v11}, Ljava/lang/StringBuilder;->append(Ljava/lang/Object;)Ljava/lang/StringBuilder;

    invoke-virtual {v7, v9}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    iget-object v6, v6, La/j/a/y;->k:Landroid/os/Bundle;

    invoke-virtual {v7, v6}, Ljava/lang/StringBuilder;->append(Ljava/lang/Object;)Ljava/lang/StringBuilder;

    invoke-virtual {v7}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v6

    invoke-static {v10, v6}, Landroid/util/Log;->v(Ljava/lang/String;Ljava/lang/String;)I

    :cond_5
    move v6, v0

    goto :goto_2

    :cond_6
    new-instance v0, Ljava/lang/IllegalStateException;

    new-instance v2, Ljava/lang/StringBuilder;

    invoke-direct {v2}, Ljava/lang/StringBuilder;-><init>()V

    invoke-virtual {v2, v8}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v2, v11}, Ljava/lang/StringBuilder;->append(Ljava/lang/Object;)Ljava/lang/StringBuilder;

    invoke-virtual {v2, v7}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    iget v3, v11, La/j/a/g;->g:I

    invoke-virtual {v2, v3}, Ljava/lang/StringBuilder;->append(I)Ljava/lang/StringBuilder;

    invoke-virtual {v2}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v2

    invoke-direct {v0, v2}, Ljava/lang/IllegalStateException;-><init>(Ljava/lang/String;)V

    invoke-direct {p0, v0}, La/j/a/t;->a(Ljava/lang/RuntimeException;)V

    throw v1

    :cond_7
    :goto_2
    add-int/lit8 v5, v5, 0x1

    goto/16 :goto_0

    :cond_8
    if-nez v6, :cond_a

    sget-boolean v0, La/j/a/t;->a:Z

    if-eqz v0, :cond_9

    const-string v0, "saveAllState: no fragments!"

    invoke-static {v10, v0}, Landroid/util/Log;->v(Ljava/lang/String;Ljava/lang/String;)I

    :cond_9
    return-object v1

    :cond_a
    iget-object v0, p0, La/j/a/t;->j:Ljava/util/ArrayList;

    invoke-virtual {v0}, Ljava/util/ArrayList;->size()I

    move-result v0

    if-lez v0, :cond_d

    new-array v2, v0, [I

    move v5, v4

    :goto_3
    if-ge v5, v0, :cond_e

    iget-object v6, p0, La/j/a/t;->j:Ljava/util/ArrayList;

    invoke-virtual {v6, v5}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v6

    check-cast v6, La/j/a/g;

    iget v6, v6, La/j/a/g;->g:I

    aput v6, v2, v5

    aget v6, v2, v5

    if-ltz v6, :cond_c

    sget-boolean v6, La/j/a/t;->a:Z

    if-eqz v6, :cond_b

    new-instance v6, Ljava/lang/StringBuilder;

    invoke-direct {v6}, Ljava/lang/StringBuilder;-><init>()V

    const-string v11, "saveAllState: adding fragment #"

    invoke-virtual {v6, v11}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v6, v5}, Ljava/lang/StringBuilder;->append(I)Ljava/lang/StringBuilder;

    invoke-virtual {v6, v9}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    iget-object v11, p0, La/j/a/t;->j:Ljava/util/ArrayList;

    invoke-virtual {v11, v5}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v11

    invoke-virtual {v6, v11}, Ljava/lang/StringBuilder;->append(Ljava/lang/Object;)Ljava/lang/StringBuilder;

    invoke-virtual {v6}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v6

    invoke-static {v10, v6}, Landroid/util/Log;->v(Ljava/lang/String;Ljava/lang/String;)I

    :cond_b
    add-int/lit8 v5, v5, 0x1

    goto :goto_3

    :cond_c
    new-instance v0, Ljava/lang/IllegalStateException;

    new-instance v3, Ljava/lang/StringBuilder;

    invoke-direct {v3}, Ljava/lang/StringBuilder;-><init>()V

    invoke-virtual {v3, v8}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    iget-object v4, p0, La/j/a/t;->j:Ljava/util/ArrayList;

    invoke-virtual {v4, v5}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v4

    invoke-virtual {v3, v4}, Ljava/lang/StringBuilder;->append(Ljava/lang/Object;)Ljava/lang/StringBuilder;

    invoke-virtual {v3, v7}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    aget v2, v2, v5

    invoke-virtual {v3, v2}, Ljava/lang/StringBuilder;->append(I)Ljava/lang/StringBuilder;

    invoke-virtual {v3}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v2

    invoke-direct {v0, v2}, Ljava/lang/IllegalStateException;-><init>(Ljava/lang/String;)V

    invoke-direct {p0, v0}, La/j/a/t;->a(Ljava/lang/RuntimeException;)V

    throw v1

    :cond_d
    move-object v2, v1

    :cond_e
    iget-object v0, p0, La/j/a/t;->l:Ljava/util/ArrayList;

    if-eqz v0, :cond_10

    invoke-virtual {v0}, Ljava/util/ArrayList;->size()I

    move-result v0

    if-lez v0, :cond_10

    new-array v1, v0, [La/j/a/c;

    :goto_4
    if-ge v4, v0, :cond_10

    new-instance v5, La/j/a/c;

    iget-object v6, p0, La/j/a/t;->l:Ljava/util/ArrayList;

    invoke-virtual {v6, v4}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v6

    check-cast v6, La/j/a/a;

    invoke-direct {v5, v6}, La/j/a/c;-><init>(La/j/a/a;)V

    aput-object v5, v1, v4

    sget-boolean v5, La/j/a/t;->a:Z

    if-eqz v5, :cond_f

    new-instance v5, Ljava/lang/StringBuilder;

    invoke-direct {v5}, Ljava/lang/StringBuilder;-><init>()V

    const-string v6, "saveAllState: adding back stack #"

    invoke-virtual {v5, v6}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v5, v4}, Ljava/lang/StringBuilder;->append(I)Ljava/lang/StringBuilder;

    invoke-virtual {v5, v9}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    iget-object v6, p0, La/j/a/t;->l:Ljava/util/ArrayList;

    invoke-virtual {v6, v4}, Ljava/util/ArrayList;->get(I)Ljava/lang/Object;

    move-result-object v6

    invoke-virtual {v5, v6}, Ljava/lang/StringBuilder;->append(Ljava/lang/Object;)Ljava/lang/StringBuilder;

    invoke-virtual {v5}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v5

    invoke-static {v10, v5}, Landroid/util/Log;->v(Ljava/lang/String;Ljava/lang/String;)I

    :cond_f
    add-int/lit8 v4, v4, 0x1

    goto :goto_4

    :cond_10
    new-instance v0, La/j/a/w;

    invoke-direct {v0}, La/j/a/w;-><init>()V

    iput-object v3, v0, La/j/a/w;->a:[La/j/a/y;

    iput-object v2, v0, La/j/a/w;->b:[I

    iput-object v1, v0, La/j/a/w;->c:[La/j/a/c;

    iget-object v1, p0, La/j/a/t;->v:La/j/a/g;

    if-eqz v1, :cond_11

    iget v1, v1, La/j/a/g;->g:I

    iput v1, v0, La/j/a/w;->d:I

    :cond_11
    iget v1, p0, La/j/a/t;->i:I

    iput v1, v0, La/j/a/w;->e:I

    invoke-virtual {p0}, La/j/a/t;->u()V

    return-object v0

    :cond_12
    :goto_5
    return-object v1
.end method

.method public toString()Ljava/lang/String;
    .locals 2

    new-instance v0, Ljava/lang/StringBuilder;

    const/16 v1, 0x80

    invoke-direct {v0, v1}, Ljava/lang/StringBuilder;-><init>(I)V

    const-string v1, "FragmentManager{"

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-static {p0}, Ljava/lang/System;->identityHashCode(Ljava/lang/Object;)I

    move-result v1

    invoke-static {v1}, Ljava/lang/Integer;->toHexString(I)Ljava/lang/String;

    move-result-object v1

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    const-string v1, " in "

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    iget-object v1, p0, La/j/a/t;->u:La/j/a/g;

    if-eqz v1, :cond_0

    goto :goto_0

    :cond_0
    iget-object v1, p0, La/j/a/t;->s:La/j/a/l;

    :goto_0
    invoke-static {v1, v0}, La/g/h/a;->a(Ljava/lang/Object;Ljava/lang/StringBuilder;)V

    const-string v1, "}}"

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v0}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    return-object v0
.end method

.method u()V
    .locals 9

    iget-object v0, p0, La/j/a/t;->k:Landroid/util/SparseArray;

    const/4 v1, 0x0

    if-eqz v0, :cond_8

    const/4 v0, 0x0

    move v2, v0

    move-object v3, v1

    move-object v4, v3

    move-object v5, v4

    :goto_0
    iget-object v6, p0, La/j/a/t;->k:Landroid/util/SparseArray;

    invoke-virtual {v6}, Landroid/util/SparseArray;->size()I

    move-result v6

    if-ge v2, v6, :cond_9

    iget-object v6, p0, La/j/a/t;->k:Landroid/util/SparseArray;

    invoke-virtual {v6, v2}, Landroid/util/SparseArray;->valueAt(I)Ljava/lang/Object;

    move-result-object v6

    check-cast v6, La/j/a/g;

    if-eqz v6, :cond_7

    iget-boolean v7, v6, La/j/a/g;->E:Z

    if-eqz v7, :cond_2

    if-nez v3, :cond_0

    new-instance v3, Ljava/util/ArrayList;

    invoke-direct {v3}, Ljava/util/ArrayList;-><init>()V

    :cond_0
    invoke-virtual {v3, v6}, Ljava/util/ArrayList;->add(Ljava/lang/Object;)Z

    iget-object v7, v6, La/j/a/g;->j:La/j/a/g;

    if-eqz v7, :cond_1

    iget v7, v7, La/j/a/g;->g:I

    goto :goto_1

    :cond_1
    const/4 v7, -0x1

    :goto_1
    iput v7, v6, La/j/a/g;->k:I

    sget-boolean v7, La/j/a/t;->a:Z

    if-eqz v7, :cond_2

    new-instance v7, Ljava/lang/StringBuilder;

    invoke-direct {v7}, Ljava/lang/StringBuilder;-><init>()V

    const-string v8, "retainNonConfig: keeping retained "

    invoke-virtual {v7, v8}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v7, v6}, Ljava/lang/StringBuilder;->append(Ljava/lang/Object;)Ljava/lang/StringBuilder;

    invoke-virtual {v7}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v7

    const-string v8, "FragmentManager"

    invoke-static {v8, v7}, Landroid/util/Log;->v(Ljava/lang/String;Ljava/lang/String;)I

    :cond_2
    iget-object v7, v6, La/j/a/g;->v:La/j/a/t;

    if-eqz v7, :cond_3

    invoke-virtual {v7}, La/j/a/t;->u()V

    iget-object v7, v6, La/j/a/g;->v:La/j/a/t;

    iget-object v7, v7, La/j/a/t;->I:La/j/a/u;

    goto :goto_2

    :cond_3
    iget-object v7, v6, La/j/a/g;->w:La/j/a/u;

    :goto_2
    if-nez v4, :cond_4

    if-eqz v7, :cond_4

    new-instance v4, Ljava/util/ArrayList;

    iget-object v8, p0, La/j/a/t;->k:Landroid/util/SparseArray;

    invoke-virtual {v8}, Landroid/util/SparseArray;->size()I

    move-result v8

    invoke-direct {v4, v8}, Ljava/util/ArrayList;-><init>(I)V

    move v8, v0

    :goto_3
    if-ge v8, v2, :cond_4

    invoke-virtual {v4, v1}, Ljava/util/ArrayList;->add(Ljava/lang/Object;)Z

    add-int/lit8 v8, v8, 0x1

    goto :goto_3

    :cond_4
    if-eqz v4, :cond_5

    invoke-virtual {v4, v7}, Ljava/util/ArrayList;->add(Ljava/lang/Object;)Z

    :cond_5
    if-nez v5, :cond_6

    iget-object v7, v6, La/j/a/g;->x:Landroidx/lifecycle/u;

    if-eqz v7, :cond_6

    new-instance v5, Ljava/util/ArrayList;

    iget-object v7, p0, La/j/a/t;->k:Landroid/util/SparseArray;

    invoke-virtual {v7}, Landroid/util/SparseArray;->size()I

    move-result v7

    invoke-direct {v5, v7}, Ljava/util/ArrayList;-><init>(I)V

    move v7, v0

    :goto_4
    if-ge v7, v2, :cond_6

    invoke-virtual {v5, v1}, Ljava/util/ArrayList;->add(Ljava/lang/Object;)Z

    add-int/lit8 v7, v7, 0x1

    goto :goto_4

    :cond_6
    if-eqz v5, :cond_7

    iget-object v6, v6, La/j/a/g;->x:Landroidx/lifecycle/u;

    invoke-virtual {v5, v6}, Ljava/util/ArrayList;->add(Ljava/lang/Object;)Z

    :cond_7
    add-int/lit8 v2, v2, 0x1

    goto/16 :goto_0

    :cond_8
    move-object v3, v1

    move-object v4, v3

    move-object v5, v4

    :cond_9
    if-nez v3, :cond_a

    if-nez v4, :cond_a

    if-nez v5, :cond_a

    iput-object v1, p0, La/j/a/t;->I:La/j/a/u;

    goto :goto_5

    :cond_a
    new-instance v0, La/j/a/u;

    invoke-direct {v0, v3, v4, v5}, La/j/a/u;-><init>(Ljava/util/List;Ljava/util/List;Ljava/util/List;)V

    iput-object v0, p0, La/j/a/t;->I:La/j/a/u;

    :goto_5
    return-void
.end method

.method v()V
    .locals 4

    monitor-enter p0

    :try_start_0
    iget-object v0, p0, La/j/a/t;->H:Ljava/util/ArrayList;

    const/4 v1, 0x0

    const/4 v2, 0x1

    if-eqz v0, :cond_0

    iget-object v0, p0, La/j/a/t;->H:Ljava/util/ArrayList;

    invoke-virtual {v0}, Ljava/util/ArrayList;->isEmpty()Z

    move-result v0

    if-nez v0, :cond_0

    move v0, v2

    goto :goto_0

    :cond_0
    move v0, v1

    :goto_0
    iget-object v3, p0, La/j/a/t;->g:Ljava/util/ArrayList;

    if-eqz v3, :cond_1

    iget-object v3, p0, La/j/a/t;->g:Ljava/util/ArrayList;

    invoke-virtual {v3}, Ljava/util/ArrayList;->size()I

    move-result v3

    if-ne v3, v2, :cond_1

    move v1, v2

    :cond_1
    if-nez v0, :cond_2

    if-eqz v1, :cond_3

    :cond_2
    iget-object v0, p0, La/j/a/t;->s:La/j/a/l;

    invoke-virtual {v0}, La/j/a/l;->e()Landroid/os/Handler;

    move-result-object v0

    iget-object v1, p0, La/j/a/t;->J:Ljava/lang/Runnable;

    invoke-virtual {v0, v1}, Landroid/os/Handler;->removeCallbacks(Ljava/lang/Runnable;)V

    iget-object v0, p0, La/j/a/t;->s:La/j/a/l;

    invoke-virtual {v0}, La/j/a/l;->e()Landroid/os/Handler;

    move-result-object v0

    iget-object v1, p0, La/j/a/t;->J:Ljava/lang/Runnable;

    invoke-virtual {v0, v1}, Landroid/os/Handler;->post(Ljava/lang/Runnable;)Z

    :cond_3
    monitor-exit p0

    return-void

    :catchall_0
    move-exception v0

    monitor-exit p0
    :try_end_0
    .catchall {:try_start_0 .. :try_end_0} :catchall_0

    throw v0
.end method

.method w()V
    .locals 2

    iget-object v0, p0, La/j/a/t;->k:Landroid/util/SparseArray;

    if-nez v0, :cond_0

    return-void

    :cond_0
    const/4 v0, 0x0

    :goto_0
    iget-object v1, p0, La/j/a/t;->k:Landroid/util/SparseArray;

    invoke-virtual {v1}, Landroid/util/SparseArray;->size()I

    move-result v1

    if-ge v0, v1, :cond_2

    iget-object v1, p0, La/j/a/t;->k:Landroid/util/SparseArray;

    invoke-virtual {v1, v0}, Landroid/util/SparseArray;->valueAt(I)Ljava/lang/Object;

    move-result-object v1

    check-cast v1, La/j/a/g;

    if-eqz v1, :cond_1

    invoke-virtual {p0, v1}, La/j/a/t;->j(La/j/a/g;)V

    :cond_1
    add-int/lit8 v0, v0, 0x1

    goto :goto_0

    :cond_2
    return-void
.end method
