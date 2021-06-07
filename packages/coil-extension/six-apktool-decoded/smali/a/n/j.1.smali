.class La/n/j;
.super Landroid/animation/AnimatorListenerAdapter;
.source ""


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = La/n/m;->a(Landroid/view/ViewGroup;La/n/M;La/n/M;)Landroid/animation/Animator;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic a:La/n/m$a;

.field final synthetic b:La/n/m;

.field private mViewBounds:La/n/m$a;


# direct methods
.method constructor <init>(La/n/m;La/n/m$a;)V
    .locals 0

    iput-object p1, p0, La/n/j;->b:La/n/m;

    iput-object p2, p0, La/n/j;->a:La/n/m$a;

    invoke-direct {p0}, Landroid/animation/AnimatorListenerAdapter;-><init>()V

    iget-object p1, p0, La/n/j;->a:La/n/m$a;

    iput-object p1, p0, La/n/j;->mViewBounds:La/n/m$a;

    return-void
.end method
